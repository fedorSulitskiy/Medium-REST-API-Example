// import supertest
const request = require('supertest');
const generateToken = require('../../auth/generateToken');

// initialize server
let server;

// test variable initialisation
let module_id;
let module_name;
let credits;
let grade;

// authorization variable initialization
let token;
let username;
let password;

// test suite
describe('cs_module API', () => {

    beforeEach(() => {
        server = require('../../index');

        // assign data
        module_id = 'TEST1234';
        module_name = 'Test Module';
        credits = 15;
        grade = 0;
        
        // ideally create a designated testing account
        username = 'fedor';
        password = 1234;
        token = generateToken({
            username:username,
            password:password,
        });
    });

    afterEach(async () => {
        // code to undo changes
        await deleteCSModule();
        server.close();
    });

    const createCSModule = () => {
        return request(server)
            .post("/api/create/")
            .set("Authorization", "Bearer "+token)
            .send({
                module_id,
                module_name,
                credits,
                grade
            });
    }

    const deleteCSModule = () => {
        return request(server)
            .delete("/api/delete/"+module_id);
    }

    const loginTest = () => {
        return request(server)
            .get('/api/login/'+username)
            .send({
                password
            });
    }

    describe('create cs_module mechanism', () => {
        it('should return 200 when cs_module created successfully', async () => {
            
            const res = await createCSModule();
            
            expect(res.status).toBe(200);
        });
        it('should return 400 when invalid token triggered', async () => {
            token = 'invalid token';

            const res = await createCSModule();
            
            expect(res.status).toBe(400);
        });
    });
    describe('login mechanism', () => {
        it('should return 200 when login is successful', async () => {
            const res = await loginTest();

            expect(res.status).toBe(200);
        });
        it('should return 404 when username doesnt exist', async () => {
            username = 'tests';

            const res = await loginTest();

            expect(res.status).toBe(404);
        });
    });
});