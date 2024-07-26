package com.teamblue.Management_App.repositories;

import com.teamblue.Management_App.entities.Team;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    Team findByName(String name);
	
	//Query to get teams based on the passed company ID
	List<Team> findTeamsByCompanyId(@Param("companyId") long companyId); 
	//When creating derived queries, JPA will try to match the name of the fields
	//EX: Our Team entity has a Company field "company", and the Company entiy has the id field "id"
	//Therefore, ByCompanyId references the Team's company field, and that company's id field.
	//NOTE: @Param should therefore also reference the ID the same way the method name does.

}
