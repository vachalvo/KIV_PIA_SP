package com.kiv.pia.backend.repository;

import com.kiv.pia.backend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, UUID> {

    @Query("SELECT DISTINCT ps from Post ps" +
            "  LEFT JOIN Friendship fe on :id = fe.endUser.id AND fe.friendshipType = 'FRIENDS'" +
            "  LEFT JOIN Friendship fs on :id = fs.sourceUser.id AND fs.friendshipType = 'FRIENDS'" +
            "    WHERE ps.user.id = :id OR" +
            "          ps.user.id = fe.sourceUser.id OR" +
            "          ps.user.id = fs.endUser.id")
    Page<Post> findAllByFriends(@Param("id") UUID id, Pageable page);

    @Query("SELECT ps from Post ps" +
            "    WHERE ps.user.id = :id")
    Page<Post> findAllByUser(@Param("id") UUID id, Pageable page);
}
