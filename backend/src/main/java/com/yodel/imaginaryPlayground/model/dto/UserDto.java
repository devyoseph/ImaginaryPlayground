package com.yodel.imaginaryPlayground.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@ApiModel(value = "UserDto (회원정보)", description = "id, 이메일, 회원명, 성별, 가입경로, 증명서 경로, 가입일/수정일, 회원구분을 가진 DTO")
public class UserDto implements UserDetails {
    private int id;

    @ApiModelProperty(value = "이메일")
    private String email;

    @ApiModelProperty(value = "이름")
    private String username;

    @ApiModelProperty(value = "가입경로")
    private String provider;

    @ApiModelProperty(value = "문서 경로")
    private String document;

    @ApiModelProperty(value = "가입일")
    private String join_date;

    @ApiModelProperty(value = "수정일")
    private String modified_date;

    @ApiModelProperty(value = "회원구분")
    private String type;

    @ApiModelProperty(value = "병원 아이디")
    private int hospital_id;

    @ApiModelProperty(value = "병원명")
    private String hospital_name;

    @ApiModelProperty(value = "병원 주소")
    private String hospital_address;

    @ApiModelProperty(value = "비밀번호")
    private String password;

    @ApiModelProperty(value = "유저의 권한을 저장하는 리스트")
    private List<String> roles = new ArrayList<>();

    @Builder
    public UserDto(String username, String email,  String provider) {
        this.username = username;
        this.email = email;
        this.provider = provider;
    }

    @Builder
    public UserDto(int id) {
        this.id = id;
    }

    @Builder
    public UserDto(String username, String password, String email, String provider) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.provider = provider;
    }

    @Builder
    public UserDto(String password, String email) {
        this.email = email;
        this.password = password;
    }

    @Builder
    public UserDto(int id, String username) {
        this.id = id;
        this.username = username;
    }

    @Builder
    public UserDto(String email, String password, String username, String provider, String document, int hospital_id, String hospital_name, String hospital_address) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.provider = provider;
        this.document = document;
        this.hospital_id = hospital_id;
        this.hospital_name = hospital_name;
        this.hospital_address = hospital_address;
    }

    @Builder
    public UserDto(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map( SimpleGrantedAuthority :: new ).collect( Collectors.toList() );
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
