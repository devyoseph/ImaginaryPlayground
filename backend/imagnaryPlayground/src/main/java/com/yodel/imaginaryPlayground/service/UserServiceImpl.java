package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    // TODO mapper 객체 추가 필요
    // TODO 로거 사용 필요
//    UserMapper userMapper;

    @Override
    public boolean registerUser(UserDto user) {
        // TODO mapper 작업 추가 필요
        // 임시적으로 sysout 사용
        System.out.println("유저 회원가입 진행!");
        System.out.println(user.toString());

        return true;
    }

    @Override
    public boolean modifyUser(UserDto user) {
        return false;
    }

    @Override
    public boolean deleteUser(int userId) {
        return false;
    }

    @Override
    public UserDto detailUser(int userId) {
        return null;
    }
}