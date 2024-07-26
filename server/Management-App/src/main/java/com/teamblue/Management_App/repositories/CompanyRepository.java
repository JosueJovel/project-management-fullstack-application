package com.teamblue.Management_App.repositories;

import com.teamblue.Management_App.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    Company findByName(String name);

    Company findById(long id);

}
