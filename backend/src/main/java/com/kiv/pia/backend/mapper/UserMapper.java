package com.kiv.pia.backend.mapper;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.response.FriendshipListResponseEntity;
import com.kiv.pia.backend.model.response.SearchResultResponse;

import java.util.ArrayList;
import java.util.List;

public class UserMapper {

    public UserMapper(){}

    public SearchResultResponse toSearchResultResponse(User user, List<Friendship> friendships, User loggedUser){
        if(friendships.size() == 0){
            return new SearchResultResponse(user, null, null, true);
        }
        return new SearchResultResponse(user,
                friendships.get(0).getId(),
                friendships.get(0).getFriendshipType(),
                friendships.get(0).getSourceUser().getId().equals(loggedUser.getId()));
    }

    public FriendshipListResponseEntity toFriendshipListResponseEntity(User user, Friendship friendship){
        List<String> roles = new ArrayList<>();
        for(Role r : user.getRoles()){
            roles.add(r.getName().toString());
        }
        return new FriendshipListResponseEntity(friendship.getId(),
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getGender(),
                roles);
    }
}
