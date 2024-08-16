
const promptsData = require('./prompts.json');
const usersData = require('./users.json');

class Prompts {
    constructor(prompts, users) {
        this.prompts = prompts.map(prompt => ({
            ...prompt,
            _id: prompt._id.$oid ,
            
        }));
        this.users = users;
    }

    getUserByUsername(username) {
        return this.users.find(user => user.username === username);

    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    
    createPrompt(username, newPrompt) {
        const user = this.getUserByUsername(username);
        if (!user) {
            return 'User not found!';
        }

        newPrompt._id = this.generateId();
        newPrompt.actor = { username };
        
        this.prompts.push(newPrompt);
        return newPrompt;
    }

   
    updatePrompt(username, promptId, updatedData) {
        const user = this.getUserByUsername(username);
        if (!user) {
            return 'User not found!';
        }

        const prompt = this.prompts.find(p => p._id === promptId);
        if (!prompt) {
            return 'Prompt not found!';
        }

        if (prompt.actor.username !== username) {
            return 'You are not authorized to update this prompt!';
        }

        Object.assign(prompt, updatedData);
        return prompt;
        
    }

    
    getPrompt(username, promptId) {
        const user = this.getUserByUsername(username);
        if (!user) {
            return 'User not found!';
        }

        const prompt = this.prompts.find(p => p._id === promptId);
        if (!prompt) {
            return 'Prompt not found!';
        }

        if (
            prompt.visibility === 'public' ||
            prompt.actor.username === username ||
            (prompt.visibility === 'custom' && prompt.sharedAccess.includes(username))
        ) {
            return prompt;
        } else {
            return 'You are not authorized to view this prompt!';
        }
    }

    
    getAllPrompts(username) {
        const user = this.getUserByUsername(username);
        if (!user) {
            return 'User not found!';
        }

        return this.prompts.filter(p => {
            return (
                p.visibility === 'public' ||
                p.actor.username === username ||
                (p.visibility === 'custom' && p.sharedAccess.includes(username))
            );
        });
    }

    
    deletePrompt(username, promptId) {
        const user = this.getUserByUsername(username);
        if (!user) {
            return 'User not found!';
        }

        const promptIndex = this.prompts.findIndex(p => p._id === promptId);
        if (promptIndex === -1) {
            return 'Prompt not found!';
        }

        if (this.prompts[promptIndex].actor.username !== username) {
            return 'You are not authorized to delete this prompt!';
        }

        this.prompts.splice(promptIndex, 1);
        return 'Prompt deleted successfully!';
    }

    
    testMethods() {
        console.log("Starting Tests...");

        
        const newPrompt = {
            prompt: "New prompt example",
            label: "example",
            visibility: "public",
            sharedAccess: [],
            description: "This is an example",
            type: 'exampleType',
            subtype: 'exampleSubtype'
        };
        console.log("Create Prompt:", this.createPrompt('johndoe', newPrompt));

        const existingPromptId = this.prompts[0]._id; 
        console.log("Get Specific Prompt:", this.getPrompt('johndoe', existingPromptId));

                console.log("Get All Prompts:", this.getAllPrompts('johndoe'));

       
        console.log("Update Prompt:", this.updatePrompt('johndoe', existingPromptId, { label: "Updated Label" }));

        console.log("Delete Prompt:", this.deletePrompt('johndoe', existingPromptId));
        
       

        
    }
}

const promptManager = new Prompts(promptsData, usersData);
promptManager.testMethods();
