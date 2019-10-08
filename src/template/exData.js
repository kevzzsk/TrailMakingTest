import TemplateA1 from "./templateA1"
import TemplateB1 from "./templateB1"

export default {
    "UserID": "researcher1",
    "Experiments": [
        {
            "result": "success",
            "experimentID": "U1282",
            "experimentName": "Test 101",
            "description": "Scelerisque felis imperdiet proin fermentum leo vel orci. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. Risus viverra adipiscing at in tellus integer. Odio euismod lacinia at quis risus sed vulputate odio. Sem fringilla ut morbi tincidunt augue interdum velit euismod in. Sed pulvinar proin gravida hendrerit. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Pretium viverra suspendisse potenti nullam ac tortor. Et sollicitudin ac orci phasellus. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim.",
            "startDate": "2019-10-05",
            "endDate": "2019-11-05",
            "templateExperiments": [{
                TemplateA1,
                "experimentResults": [{
                    "participantID": 1,
                    "totalTime": 10.123,
                    "success": 12,
                    "error": 5,
                    "miss": 2,
                },
                {
                    "participantID": 2,
                    "totalTime": 9.123,
                    "success": 12,
                    "error": 4,
                    "miss": 0,
                }, {
                    "participantID": 3,
                    "totalTime": 8.81,
                    "success": 12,
                    "error": 0,
                    "miss": 0,
                }, {
                    "participantID": 4,
                    "totalTime": 10.34,
                    "success": 12,
                    "error": 2,
                    "miss": 8,
                }, {
                    "participantID": 5,
                    "totalTime": 9.65,
                    "success": 12,
                    "error": 1,
                    "miss": 9,
                }, {
                    "participantID": 6,
                    "totalTime": 9.80,
                    "success": 12,
                    "error": 2,
                    "miss": 5,
                }]
            }]
        }
        ,
        {
            "result": "success",
            "experimentID": "R2131",
            "experimentName": "Experiment 01",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "startDate": " 2019-11-11",
            "endDate": "2019-12-11",
            "templateExperiments": [{
                TemplateB1,
                "experimentResults": [{
                    "participantID": 1,
                    "totalTime": 8.13,
                    "success": 8,
                    "error": 5,
                    "miss": 2,
                },
                {
                    "participantID": 2,
                    "totalTime": 8.123,
                    "success": 8,
                    "error": 4,
                    "miss": 0,
                }, {
                    "participantID": 3,
                    "totalTime": 7.281,
                    "success": 8,
                    "error": 0,
                    "miss": 0,
                }, {
                    "participantID": 4,
                    "totalTime": 10.34,
                    "success": 8,
                    "error": 2,
                    "miss": 8,
                }, {
                    "participantID": 5,
                    "totalTime": 9.23,
                    "success": 8,
                    "error": 1,
                    "miss": 9,
                }, {
                    "participantID": 6,
                    "totalTime": 9.80,
                    "success": 8,
                    "error": 2,
                    "miss": 5,
                }]
            }]
        },
    ]
}