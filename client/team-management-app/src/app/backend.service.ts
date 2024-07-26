import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { delay, Observable, of, throwError } from 'rxjs';
import {
  CredentialsDto,
  FullUserDto,
  AnnouncementDto,
  CompanyDto,
  ProjectDto,
  TeamDto,
  TeamRequestDto,
  CreateAnnouncementDto,
  ProjectRequestDto,
  UserRequestDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private backendUrl = 'http://localhost:8080/';
  currentTeam: TeamDto = { id: -1, name: '', description: '', users: [] }; //This variable will dynamically change as different team projects are requested

  constructor(private http: HttpClient) {}

  async getTeamProjects(team: TeamDto): Promise<ProjectDto[]> {
    //Fetches team projects based on given TeamDto
    //use API endpoint /company/is/teams/id/projects
    const selectedCompany: CompanyDto = JSON.parse(
      localStorage.getItem('selectedCompany')!
    ); // Get Current CompanyDto
    const companyId = selectedCompany.id; // Get current company ID
    const teamId = team.id;

    // Create and use URL
    const url =
      this.backendUrl + `company/${companyId}/teams/${teamId}/projects`; // Endpoint URL

    try {
      //Try/catch block since we are now awaiting on promises.
      const projects: ProjectDto[] =
        (await this.http.get<ProjectDto[]>(url).toPromise()) || []; // Send get request to the endpoint and await the promise to get [ProjectDto]
      // console.log("Projects fetched from backend:" + JSON.stringify(projects));
      projects.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return projects; //Return the fetched [ProjectDto] we awaited for
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  }

  login(credentials: CredentialsDto): Observable<FullUserDto> {
    return this.http.post<FullUserDto>(
      this.backendUrl + 'users/login',
      credentials
    );
  }

  fetchAnnouncements(id: number): Observable<AnnouncementDto[]> {
    const url = this.backendUrl + `company/${id}/announcements`;
    return this.http.get<AnnouncementDto[]>(url);
  }

  createAnnouncement(
    id: number,
    announcement: CreateAnnouncementDto
  ): Observable<AnnouncementDto> {
    const url = this.backendUrl + `company/${id}/announcement`;
    return this.http.post<AnnouncementDto>(url, announcement);
  }

  getUsers(id: number): Observable<FullUserDto[]> {
    const url = this.backendUrl + `company/${id}/users`;
    return this.http.get<FullUserDto[]>(url);
  }

  async createUser(
    user: UserRequestDto,
    id: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.http
        .post(this.backendUrl + `company/${id}/user`, user)
        .toPromise();
      return { success: true };
    } catch (error: unknown) {
      let errorMessage = 'Failed to create the user. Pleae try again later.';
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Backend error
          errorMessage =
            error.error.message || error.statusText || errorMessage;
        }
      }

      return { success: false, error: errorMessage };
    }
  }

  async getListOfTeams(): Promise<TeamDto[]> {
    //As we are using promises, we must await them to get the actual value.
    const selectedCompany: CompanyDto = JSON.parse(
      localStorage.getItem('selectedCompany')!
    ); // Get Current CompanyDto
    if (!selectedCompany) {
      //If selected company is null (nothing in local storage), return nothing
      console.error('No company found');
      return [];
    }
    const companyId = selectedCompany.id; // Get current company ID

    // Create and use URL
    const url = this.backendUrl + `company/${companyId}/teams`; // Endpoint URL

    try {
      //Try/catch block since we are now awaiting on promises.
      const teams: TeamDto[] =
        (await this.http.get<TeamDto[]>(url).toPromise()) || []; // Send get request to the endpoint and await the promise to get [TeamDto]
      // console.log("Teams fetched from backend:" + JSON.stringify(teams));
      return teams; //Return the fetched [TeamDto] we awaited for
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  }

  async getActiveMembers(): Promise<FullUserDto[]> {
    //As we are using promises, we must await them to get the actual value.
    //Fetch all of the current company's users
    const selectedCompany: CompanyDto = JSON.parse(
      localStorage.getItem('selectedCompany')!
    ); // Get Current CompanyDto
    const companyId = selectedCompany.id; // Get current company ID

    // Create and use URL
    const url = this.backendUrl + `company/${companyId}/users`; // Endpoint URL

    try {
      //Try/catch block since we are now awaiting on promises.
      const teams: FullUserDto[] =
        (await this.http.get<FullUserDto[]>(url).toPromise()) || []; // Send get request to the endpoint and await the promise to get [FullUserDto]
      return teams; //Return the fetched [FullUserDto] we awaited for
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  }

  async createTeam(
    newTeamRequestDto: TeamRequestDto
  ): Promise<{ success: boolean; error?: string }> {
    //This method will send a TeamRequestDto with the company ID path variable.

    const selectedCompany: CompanyDto = JSON.parse(
      localStorage.getItem('selectedCompany')!
    ); // Get Current CompanyDto
    const companyId = selectedCompany.id; // Get current company ID

    // Create and use URL
    const url = this.backendUrl + `company/${companyId}/team`; // Endpoint URL

    try {
      //Try/catch block since we are now awaiting on promises.
      //Send POST request to id/team endpoint, attaching newTeamRequestDto as RequestBody.
      await this.http.post<TeamDto>(url, newTeamRequestDto).toPromise();
      //Await this promise so that we know the operation completes and our DB is updated
      return { success: true };
    } catch (error: unknown) {
      console.error('Error posting team:', error);
      let errorMessage = 'Failed to create the team. Pleae try again later.';
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Backend error
          errorMessage =
            error.error.message || error.statusText || errorMessage;
        }
      }

      return { success: false, error: errorMessage };
    }
    // Nothing else to return, because now getTeams() needs to be ran again where needed
  }

  async createProject(newProjectRequestDto: ProjectRequestDto): Promise<void> {
    const selectedCompany: CompanyDto = JSON.parse(
      localStorage.getItem('selectedCompany')!
    ); // Get Current CompanyDto
    const companyId = selectedCompany.id; // Get current company ID
    const teamId = newProjectRequestDto.team.id; //Get project team's ID

    // Create and use URL
    const url =
      this.backendUrl + `company/${companyId}/teams/${teamId}/project`; // Endpoint URL for posting a new project

    try {
      //Try/catch block since we are now awaiting on promises.
      //Send POST request to id/team endpoint, attaching newProjectRequestDto as RequestBody.
      await this.http.post<ProjectDto>(url, newProjectRequestDto).toPromise(); //Await this promise so that we know the operation completes and our DB is updated
    } catch (error) {
      console.error('Error posting team:', error);
    }
  }
  async updateProject(newProjectDto: ProjectDto): Promise<void> {
    const selectedCompany: CompanyDto = JSON.parse(
      localStorage.getItem('selectedCompany')!
    ); // Get Current CompanyDto
    const companyId = selectedCompany.id; // Get current company ID
    const teamId = newProjectDto.team.id; //Get project team's ID

    // Create and use URL
    const url =
      this.backendUrl + `company/${companyId}/teams/${teamId}/project`; // Endpoint URL for posting a new project

    try {
      //Try/catch block since we are now awaiting on promises.
      //Send PATCH request to id/team endpoint, attaching newProjectDto as RequestBody.
      await this.http.patch<ProjectDto>(url, newProjectDto).toPromise(); //Await this promise so that we know the operation completes and our DB is updated
    } catch (error) {
      console.error('Error posting team:', error);
    }
  }
  getCurrentTeam(): TeamDto {
    return this.currentTeam;
  }
  setCurrentTeam(teamDto: TeamDto) {
    //Assign current team with a new TeamDto
    this.currentTeam = teamDto;
  }

  //DUMMY DATA AND METHODS:

  //Dummy Team 1 with Ai Hoshino, Aqua Hoshino, and Ruby Hoshino
  //Example of insantiating an object from our models:
  team1: TeamDto = {
    // FORMAT: name: type = (data)
    id: 1, //Setting the properties for each instance
    name: 'B-Komachi',
    description: 'Specialists in Entertainment Media',
    users: [
      //users is an array of Basic User DTOs, which is represnted as a JSON object of our basic user DTO
      {
        //BasicUserDto 1
        id: 2,
        profile: {
          firstname: 'Ai',
          lastname: 'Hoshino',
          email: 'hoshino.ai@bkomachi.com',
          phone: '5555551234',
        }, //ProfileDto of BasicUserDto 1
        isAdmin: true,
        active: false,
        status: 'Not Active',
      },
      {
        //BasicUserDto 2
        id: 3,
        profile: {
          firstname: 'Aqua',
          lastname: 'Hoshino',
          email: 'hoshino.aqua@bkomachi.com',
          phone: '5555552345',
        }, //ProfileDto of BasicUserDto 2
        isAdmin: false,
        active: true,
        status: 'Active',
      },
      {
        //BasicUserDto 2
        id: 4,
        profile: {
          firstname: 'Ruby',
          lastname: 'Hoshino',
          email: 'hoshino.Ruby@bkomachi.com',
          phone: '5555553456',
        }, //ProfileDto of BasicUserDto 3
        isAdmin: false,
        active: true,
        status: 'Active',
      },
    ],
  };

  //Dummy Team 2 with Richard Winters, Herbert Sobel, and Robert Sink
  team2: TeamDto = {
    // FORMAT: name: type = (data)
    id: 5, //Setting the properties for each instance
    name: 'Easy Company',
    description: 'Specialists in Mil-Tech',
    users: [
      //users is an array of Basic User DTOs, which is represnted as a JSON object of our basic user DTO
      {
        //BasicUserDto 1
        id: 6,
        profile: {
          firstname: 'Richard',
          lastname: 'Winters',
          email: 'richard.winters@101st.com',
          phone: '1234569999',
        }, //ProfileDto of BasicUserDto 1
        isAdmin: false,
        active: true,
        status: 'Active',
      },
      {
        //BasicUserDto 2
        id: 7,
        profile: {
          firstname: 'Herbert',
          lastname: 'Sobel',
          email: 'herber.sobel@101st.com',
          phone: '1234568888',
        }, //ProfileDto of BasicUserDto 1
        isAdmin: false,
        active: true,
        status: 'Active',
      },
      {
        //BasicUserDto 3
        id: 8,
        profile: {
          firstname: 'Robert',
          lastname: 'Sink',
          email: 'robert.sink@101st.com',
          phone: '1234567777',
        }, //ProfileDto of BasicUserDto 1
        isAdmin: true,
        active: true,
        status: 'Active',
      },
    ],
  };

  team1Projects: ProjectDto[] = [
    //3 projects. This is the kind of response we will recieve from our get projects enpoint: A list of projects
    {
      id: 9,
      name: 'Our Sign Is B',
      description: 'Hit Single',
      active: false,
      team: this.team1, //Typically, this team attribute would have the JSON notation of a TeamDto, we are just using our dummy variable for readability
    },
    {
      id: 10,
      name: 'Star T Rain',
      description: 'Fan Favorite',
      active: false,
      team: this.team1,
    },
    {
      id: 11,
      name: 'Super Motor',
      description: 'Cult Classic',
      active: false,
      team: this.team1,
    },
  ];

  team2Projects: ProjectDto[] = [
    //4 Projects
    {
      id: 12,
      name: 'Operation Overlord',
      description: 'Turning Point',
      active: false,
      team: this.team2,
    },
    {
      id: 13,
      name: 'Operation Market Garden',
      description: 'Unsuccesful project',
      active: false,
      team: this.team2,
    },
    {
      id: 14,
      name: 'Battle of the Bulge',
      description: 'Desperate Defense',
      active: false,
      team: this.team2,
    },
    {
      id: 15,
      name: 'Brecourt Manor',
      description: 'Premier Example',
      active: false,
      team: this.team2,
    },
  ];

  //New Company of Dummy Data
  company2: CompanyDto = {
    id: 16,
    name: 'Screaming Eagles',
    description: 'A Company about Mil-Tech',
    teams: [this.team2],
    users: [
      //users is an array of Basic User DTOs, which is represnted as a JSON object of our basic user DTO
      {
        //BasicUserDto 1
        id: 6,
        profile: {
          firstname: 'Richard',
          lastname: 'Winters',
          email: 'richard.winters@101st.com',
          phone: '1234569999',
        }, //ProfileDto of BasicUserDto 1
        isAdmin: false,
        active: true,
        status: 'Active',
      },
      {
        //BasicUserDto 2
        id: 7,
        profile: {
          firstname: 'Herbert',
          lastname: 'Sobel',
          email: 'herber.sobel@101st.com',
          phone: '1234568888',
        }, //ProfileDto of BasicUserDto 1
        isAdmin: false,
        active: true,
        status: 'Active',
      },
      {
        //BasicUserDto 3
        id: 8,
        profile: {
          firstname: 'Robert',
          lastname: 'Sink',
          email: 'robert.sink@101st.com',
          phone: '1234567777',
        }, //ProfileDto of BasicUserDto 1
        isAdmin: true,
        active: true,
        status: 'Active',
      },
    ],
  };

  company2TeamMembers: FullUserDto[] = [
    //Create list of company members of dummy data to make members of project.
    {
      //FullUserDto 1
      id: 6,
      profile: {
        firstname: 'Richard',
        lastname: 'Winters',
        email: 'richard.winters@101st.com',
        phone: '1234569999',
      }, //ProfileDto of BasicUserDto 1
      isAdmin: false,
      active: true,
      status: 'Active',
      companies: [this.company2],
      teams: [this.team2],
    },
    {
      //FullUserDto 2
      id: 7,
      profile: {
        firstname: 'Herbert',
        lastname: 'Sobel',
        email: 'herber.sobel@101st.com',
        phone: '1234568888',
      }, //ProfileDto of BasicUserDto 1
      isAdmin: false,
      active: true,
      status: 'Active',
      companies: [this.company2],
      teams: [this.team2],
    },
    {
      //FullUserDto 3
      id: 8,
      profile: {
        firstname: 'Robert',
        lastname: 'Sink',
        email: 'robert.sink@101st.com',
        phone: '1234567777',
      }, //ProfileDto of BasicUserDto 1
      isAdmin: true,
      active: true,
      status: 'Active',
      companies: [this.company2],
      teams: [this.team2],
    },
  ];

  listOfDummyTeams: TeamDto[] = [this.team1, this.team2];

  //Add a new team to the list of teams
  addDummyTeam(newTeam: TeamDto): void {
    this.listOfDummyTeams.push(newTeam);
  }

  getDummyTeam1(): TeamDto {
    //Function signature: name(): return-type {do stuff}
    return this.team1;
  }

  getDummyTeam2(): TeamDto {
    return this.team2;
  }

  // Devin test block
  //POST /users/login test
  private mockAdmin: FullUserDto = {
    id: 1,
    profile: {
      firstname: 'Ai',
      lastname: 'Hoshino',
      email: 'hoshino.ai@bkomachi.com',
      phone: '5555551234',
    }, //User profile stollen from Josue =)
    isAdmin: true,
    active: true,
    status: 'active',
    companies: [
      {
        id: 1,
        name: "Carter's",
        description: "We make kid's cloths",
        teams: [],
        users: [],
      },
      {
        id: 2,
        name: "Lee's",
        description: 'We fix cars',
        teams: [],
        users: [],
      },
    ],
    teams: [],
  };

  private mockUser: FullUserDto = {
    id: 1,
    profile: {
      firstname: 'Aqua',
      lastname: 'Hoshino',
      email: 'hoshino.aqua@bkomachi.com',
      phone: '5555552345',
    }, //User profile stollen from Josue =)
    isAdmin: false,
    active: true,
    status: 'active',
    companies: [
      {
        id: 1,
        name: "Carter's",
        description: "We make kid's cloths",
        teams: [],
        users: [],
      },
    ],
    teams: [],
  };

  private mockAnnouncements: AnnouncementDto[] = [
    {
      id: 1,
      date: 1721747368975,
      title: 'Announcement 1',
      message: 'This is the first announcement.',
      author: {
        id: 1,
        profile: {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
        },
        isAdmin: true,
        active: true,
        status: 'Active',
      },
    },
    {
      id: 2,
      date: 1721747389451,
      title: 'Announcement 2',
      message: 'This is the second announcement.',
      author: {
        id: 2,
        profile: {
          firstname: 'Jane',
          lastname: 'Smith',
          email: 'jane.smith@example.com',
          phone: '987-654-3210',
        },
        isAdmin: false,
        active: true,
        status: 'Active',
      },
    },
  ];

  // login(credentials: CredentialsDto): Observable<FullUserDto> {
  //   if (
  //     credentials.username === 'admin' &&
  //     credentials.password === 'password'
  //   ) {
  //     return of(this.mockAdmin).pipe(delay(1000)); // Simulate network delay
  //   }
  //   if (
  //     credentials.username === 'user' &&
  //     credentials.password === 'password'
  //   ) {
  //     return of(this.mockUser).pipe(delay(1000)); // Simulate network delay
  //   } else {
  //     return throwError(() => new Error('Invalid username or password')).pipe(
  //       delay(1000)
  //     );
  //   }
  // }
}
