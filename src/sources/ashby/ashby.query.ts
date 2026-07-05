export const JOB_QUERY = `
query ApiJobBoardWithTeams(
$organizationHostedJobsPageName:String!
){

jobBoard(
organizationHostedJobsPageName:
$organizationHostedJobsPageName
){

jobs{

id

title

employmentType

publishedAt

isRemote

jobUrl

location{
locationName
}

}

}

}
`;