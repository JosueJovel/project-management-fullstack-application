package com.teamblue.Management_App.repositories;

import com.teamblue.Management_App.entities.Announcements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementsRepository extends JpaRepository<Announcements, Long> {

    @Query("SELECT a FROM Announcements a JOIN a.company c WHERE c.id = :companyId")
    List<Announcements> findAnnouncementsByCompanyId(@Param("companyId") long companyId);

}
