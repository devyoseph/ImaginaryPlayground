package com.yodel.imaginaryPlayground.service;

import com.yodel.imaginaryPlayground.model.dto.BabyDto;
import com.yodel.imaginaryPlayground.model.dto.ConsultDto;
import com.yodel.imaginaryPlayground.model.dto.PageDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface UserCareService {
    int saveBaby(BabyDto baby) throws Exception;
    List<BabyDto> lookupAllBaby(PageDto pageDto) throws Exception;
    List<BabyDto> searchByKeyword(PageDto pageDto) throws Exception;
    BabyDto lookupBaby(Map<String, Integer> map) throws Exception;
    int updateBabyInfo(BabyDto baby) throws Exception;

    int deleteBabyInfo(Map<String, String> map) throws Exception;
    List<ConsultDto> getConsultData(Map<String, String> map) throws Exception;

}
