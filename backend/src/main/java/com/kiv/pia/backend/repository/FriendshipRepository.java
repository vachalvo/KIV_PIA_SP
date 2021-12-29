package com.kiv.pia.backend.repository;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.enums.FriendshipType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface FriendshipRepository extends CrudRepository<Friendship, UUID> {

    @Query("SELECT r FROM Friendship r WHERE (r.sourceUser.id = :source_user_id AND r.endUser.id = :end_user_id) OR " +
            "(r.sourceUser.id = :end_user_id AND r.endUser.id = :source_user_id)")
    Iterable<Friendship> findByBothInBothWays(@Param("source_user_id") UUID source_user_id, @Param("end_user_id") UUID end_user_id);

    @Query("SELECT r FROM Friendship r WHERE r.sourceUser.id = :source_user_id AND r.endUser.id = :end_user_id")
    Iterable<Friendship> findByBoth(@Param("source_user_id") UUID source_user_id, @Param("end_user_id") UUID end_user_id);

    @Query("SELECT r FROM Friendship r WHERE r.sourceUser.id = :source_user_id AND r.friendshipType = :friendshipType")
    Iterable<Friendship> findBySourceAndType(@Param("source_user_id") UUID source_user_id,
                                             @Param("friendshipType") FriendshipType friendshipType);

    @Query("SELECT r FROM Friendship r WHERE r.endUser.id = :end_user_id AND r.friendshipType = :friendshipType")
    Iterable<Friendship> findByEndAndType(@Param("end_user_id") UUID end_user_id,
                                          @Param("friendshipType") FriendshipType friendshipType);

    @Query("SELECT r FROM Friendship r WHERE (r.endUser.id = :id OR r.sourceUser.id = :id) AND r.friendshipType = 'FRIENDS'")
    Iterable<Friendship> findAllFriends(@Param("id") UUID id);
    @Query("SELECT r FROM Friendship r WHERE (r.endUser.email = :email OR r.sourceUser.email = :email) AND r.friendshipType = 'FRIENDS'")
    Iterable<Friendship> findAllFriends(@Param("email") String email);
}
