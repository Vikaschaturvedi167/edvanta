const prompts = require('./prompts.json');

// print prompts
// console.log(prompts)

// Write your code here...

/**
 * Task: 
 *   - Here is the json file which contains number of prompts with structure
 * 
 *  @Prompts:
 *  - _id: ObjectId
 *  - prompt: <prompt>
 *  - label: <label>
 *  - visibility: [public, private, custom],
 *  - sharedAccess: [],
 *  - description: "",
 *  - type: '',
 *  - subtype: '',
 *  - actor: { username: '' }
 * 
 *  @Users:
 *    - username: 
 *    - email: 
 *    - password:
 *    - firstName: 
 *    - lastName: 
 *    - email: 
 * 
 *  @Description:
 *    - import both JSON files prompts.json user.json
 *    - write a class Prompts which takes prompts schema as input
 *    - create methods for create, update, get, getAll, delete prompts
 *    - prompts can only be access with the username.
 *    - You can only see the prompts that are either public or their they are created by you
 *    - Implement the logic for sharedAccess where visibility is custom, and other user can see those prompts if they are in sharedAccess list
 */