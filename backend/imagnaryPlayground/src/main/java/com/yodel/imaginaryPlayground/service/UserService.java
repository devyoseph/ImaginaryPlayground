package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.UserDto;

public interface UserService {

    public boolean registerUser(UserDto user);
    public boolean modifyUser(UserDto user);
    public boolean deleteUser(int userId);
    public UserDto detailUser(int userId);
    // 사용자 전체 검색은 사용하지 않을 것 같아서 제외
}
