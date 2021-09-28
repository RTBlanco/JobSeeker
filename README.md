# JobSeeker

JobSeeker is a site where an individual user can have a way to keep track of job searches
  - They will be able to save a job 
  - keep track of the interviews
  - And also be a calendar of sorts that only contain job interviews dates


## Modals 

Association
	A user will have many jobs aka -> "one to many relation" and a job belongs to a user. A job will have many interviews -> "one to many relations" and an interview belongs to a job.


### User : 
- Name ->  str
- email ->  str
- password ->  str
- favorites ->  array of top 3 three jobs (method)

### Job : 
- position ->  str
- company name ->  str
- hopeful salary ->  int
- status ->  interviewing | rejected ->  str
- offer ->  NIL if not given 
- interviews ->  array of interview dates 

### Interview : 
 - date -> date
 - notes - str

# API Routes
## User Routes
| Action | Verb | Route |
|--------|------|-------|
| LOGIN  | POST | ```/user/login``` | 
| SIGNUP | POST | ```/user/new``` |
| FETCH USER | GET | ```/user``` |
| EDIT USER | PATCH | ```/user``` |
| DELETE USER | DELETE | ```/user``` |

## Job Routes
| Action | Verb | Route |
|--------|------|-------| 
| FETCH ALL JOBS | GET | ```/user/jobs``` |
| FETCH JOB | GET | ```/user/jobs/:jobId``` |
| EDIT JOB | PATCH | ```/user/jobs/:jobId``` |
| DELETE JOB | DELETE | ```/user/jobs/:jobId``` |

## Interview Routes
| Action | Verb | Route |
|--------|------|-------| 
| FETCH ALL INTERVIEWS | GET | ```/user/jobs/:jobId/interviews``` |
| FETCH INTERVIEW | GET | ```/user/jobs/:jobId/interviews/:interviewId``` |
| EDIT INTERVIEW | PATCH | ```/user/jobs/:jobId/interviews/:interviewId``` |
| DELETE INTERVIEW | DELETE | ```/user/jobs/:jobId/interviews/:interviewId```|


# Note - Need to start postgresql server to use 
  - [Windows Wsl2](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql)
  