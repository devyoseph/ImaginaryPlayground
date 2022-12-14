package com.yodel.imaginaryPlayground.controller;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import com.yodel.imaginaryPlayground.model.jwt.JwtTokenService;
import com.yodel.imaginaryPlayground.model.vo.EmailCodeVO;
import com.yodel.imaginaryPlayground.service.EmailService;
import com.yodel.imaginaryPlayground.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final EmailService emailService;

    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String error = "ERROR";

    @Value("${variable.image.save.path}")
    String FILE_PATH;

    @PostMapping("/register")
    @ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
    public Map<String, Object> signUp(
            @RequestPart("document") MultipartFile file,
            @RequestParam("data") String data, HttpServletRequest request) {

        Map<String, Object> result = new HashMap<>();
        JSONObject signupData = new JSONObject(data);

        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        System.out.println(request.getServletContext().getRealPath("/"));   //경로

        String email = "";
        String password = "";
        String username = "";
        String provider = "SITE";
        int hospital_id = 0;
        String hospital_name = "";
        String hospital_address = "";

        Iterator it = signupData.keys();
        while (it.hasNext()) {
            String key = (String) it.next();
            if (key.equals("password")) {
                password = signupData.getString(key);
            } else if (key.equals("email")) {
                email = signupData.getString(key);
            } else if (key.equals("username")) {
                username = signupData.getString(key);
            } else if (key.equals("hospital_id")) {
                hospital_id = signupData.getInt(key);
            } else if (key.equals("hospital_name")) {
                hospital_name = signupData.getString(key);
            } else if (key.equals("hospital_address")) {
                hospital_address = signupData.getString(key);
            }
        }

        System.out.println("email: " + email);
        System.out.println(" password: " + password);
        System.out.println(" username: " + username);
        System.out.println(" hospital_id: " + hospital_id);
        System.out.println(" hospital_name: " + hospital_name);
        System.out.println(" hospital_name: " + hospital_address);

        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
            String uploadDate = simpleDateFormat.format(new Date());
            String document = save(file, uploadDate);

//            userService.saveFile(document, email);

            UserDto user = new UserDto(email, password, username, provider, document, hospital_id, hospital_name, hospital_address);

            int chkEmail = userService.countByEmail(user.getEmail());
            if(chkEmail != 1){    //기존 사용자가 아닌 경우 회원가입 진행
                int res = userService.saveUser(user);    // 유저정보 저장

                if(res == 1) {       // 저장 성공
                    //id 가져오기
                    int id = userService.getUserId(user.getEmail());
                    //password 저장
                    int res2 = userService.savePassword(id, password);
                    if(res2 == 1) {
                        result.put("status", success);   //저장 성공
                        result.put("data", user);
                    }else {
                        result.put("status", fail);
                    }
                } else {
                    result.put("status", fail);
                }
            } else {
                result.put("status", fail);
            }
        } catch (IllegalStateException e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "로그인을 한다.")
    public Map<String, Object> login(
            @RequestBody @ApiParam(value = "로그인 정보를 입력한다.") UserDto userInfo) {

        Map<String, Object> result = new HashMap<>();
        String password = userInfo.getPassword();   // 입력한 비밀번호

        try {
            int res = userService.countByEmail(userInfo.getEmail());
            if(res == 1){   //가입한 회원이면
                //id 가져오기
                int id = userService.getUserId(userInfo.getEmail());
                //비밀번호 가져오기
                String user_password = userService.getPassword(id);

                if(password.equals(user_password)){    //비밀번호 유효성 검사
                    //공통으로 토큰이 들어간다(로그인 성공시 따로 넣어준다).
                    String token = jwtTokenService.createToken(userInfo.getEmail(), userInfo.getType());

                    //병원주소(이메일을 이용해서 병원 아이디를 가져오고, 병원 아이디를 이용해서 병원 주소를 가져온다)

                    result.put("status", success);
                    result.put("data", token);
                }else{
                    result.put("status", fail);
                }
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @GetMapping("")
    @ApiOperation(value = "회원 정보 조회", notes = "회원 정보를 조회한다.")
    public Map<String, Object> detailUser() {

//        System.out.println("token::" + token);
//        Authentication auth_data = jwtTokenService.getAuthentication(token);

        Map<String, Object> result = new HashMap<>();

        try {
            UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(user != null){
                result.put("status", success);
                result.put("data", user);
            }else{
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

    @PutMapping("")
    @ApiOperation(value = "회원 정보 수정", notes = "회원 페이지에서 사용자의 정보를 수정할 수 있다.")
    public Map<String, Object> updateUserInfo(@RequestBody Map<String, String> map){

        Map<String, Object> result = new HashMap<>();
        String username = map.get("username");
        try {

            if(username != null && !username.trim().equals("")) {
                UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                user.setUsername(username);

                int res = userService.updateUserInfo(user);

                if (res == 1) {
                    userService.findByEmail(user.getEmail());
                    result.put("status", success);
                    result.put("data", user);
                } else {
                    result.put("status", fail);
                }

            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }

        return result;
    }

    @DeleteMapping("")
    @ApiOperation(value = "회원 탈퇴", notes = "회원 페이지에서 사용자의 정보를 삭제한다.")
    public Map<String, String> deleteUser(@RequestHeader("Auth") String token){

        Map<String, String> result = new HashMap<>();

        try {
            UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            int userId = user.getId();
            int res = userService.deleteUser(userId);
            if(res == 1) {
                result.put("status", success);
                jwtTokenService.closeToken(token);
                SecurityContextHolder.clearContext();
            } else {
                result.put("status", fail);
            }
        } catch (Exception e) {
            result.put("status", error);
            result.put("message", e.toString());
        }
        return result;
    }

//    @PostMapping("/upload")
//    @ApiOperation(value = "재직 증명서 업로드")
//    public Map<String, Object> uploadFile(
//            @RequestParam("file") MultipartFile document, HttpServletRequest request) {
//
//        Map<String, Object> result = new HashMap<>();
//
//        String fileName = document.getOriginalFilename();
//        System.out.println(fileName);
//        System.out.println(request.getServletContext().getRealPath("/"));
//
//        try {
//            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmm");
//            String uploadDate = simpleDateFormat.format(new Date());
//            String file = save(document, request.getServletContext().getRealPath("/"), uploadDate);
//
//            userService.saveFile(file);
//            result.put("status", success);
//        } catch (IllegalStateException e) {
//            result.put("status", error);
//            result.put("message", e.toString());
//        }
//        return result;
//    }

    @PostMapping("/authEmail/send")
    public Map<String, Object> sendEmail(@RequestBody UserDto user){
        Map<String, Object> result = new HashMap<>();

        String email = user.getEmail();
        int chkEmail = userService.countByEmail(email);
        if(chkEmail != 1) {
            System.out.println("이메일 인증 진행 :"+ email);

            //먼저 관련 email 인증을 삭제한다
            userService.deleteEmailCode(email);

            final int CODE = (int) ( 100000 + Math.random()*899999); //임의의 6자리 코드 생성

            if(emailService.sendEmail( email // 메일 인증 성공
                    , "[상상놀이터] 이메일 인증 안내"
                    , "인증코드는 [ "+CODE+" ] 입니다.").get("status").equals(success)){
                int res = userService.saveEmailAuth(email, Integer.toString(CODE));
                if(res == 1){
                    result.put("status", success);
                }else{
                    result.put("status", error);
                }
            }else{
                // 메일 인증 실패
                result.put("status", fail);
            }
        }else {
            result.put("status", fail);
        }
        return result;
    }

    @PostMapping("/authEmail/receive")
    public Map<String, Object> authEmailCode(@RequestBody EmailCodeVO emailCodeVO){
        Map<String, Object> result = new HashMap<>();
        System.out.println("이메일 코드 일치 여부 확인 :"+ emailCodeVO);

        String msg = "";
        int res = userService.authEmailCode(emailCodeVO);

        if(res == 1){
            result.put("status", success);
            result.put("message", "이메일 인증에 성공했습니다.");
            userService.deleteEmailCode(emailCodeVO.getEmail());
        }else{
            result.put("status", fail);
            result.put("message", "이메일 인증에 실패했습니다.");
        }
        return result;
    }

    @PostMapping("/token")
    public Map<String, Object> parseToken(){
        Map<String, Object> result = new HashMap<>();
        System.out.println("들어왔냐");
        UserDto user = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(user != null){
            result.put("status", success);
            result.put("data", user);
        }else{
            result.put("status", fail);
        }

        return result;
    }

    @PostMapping("/logout")
    public Map<String, Object> logout(@RequestHeader("Auth") String token){
        System.out.println(token);
        Map<String, Object> result = new HashMap<>();

        if(token != null){
            result.put("status", success);
            jwtTokenService.closeToken(token);
            SecurityContextHolder.clearContext();
        }else {
            result.put("status", fail);
        }
        return result;
    }

    private String save(MultipartFile file, String uploadDate) {

        try {
            String newFileName = uploadDate + file.getOriginalFilename();
            byte[] bytes = file.getBytes();
            Path path = Paths.get(FILE_PATH + newFileName);
            System.out.println(path);
            Files.write(path, bytes);
            return path.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
