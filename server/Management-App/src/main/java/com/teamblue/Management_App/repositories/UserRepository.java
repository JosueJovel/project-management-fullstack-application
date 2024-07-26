package com.teamblue.Management_App.repositories;

import java.util.List;

import com.teamblue.Management_App.dtos.FullUserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.teamblue.Management_App.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByCredentialsUsername(String username);
    @Query("SELECT u FROM User u JOIN u.companies c WHERE c.id = :companyId")
    List<User> findUsersByCompanyId(@Param("companyId") long companyId);

}