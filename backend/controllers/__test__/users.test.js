const app = require('../../app');
const supertest = require('supertest');

describe('returns JSON data for all users', () => {
    it('returns a object with all users', async () => {
        await supertest(app).get('/users')
            .expect(200)
            .then(res => {
                // expect(res.body.users[0].name).toBe('Adam Z');
                // expect(res.body.users[1].name).toBe('Brian J');
                // expect(res.body.users.length).toBe(2)
                expect(res.body.users).toBeInstanceOf(Array)
                expect(res.body.users.length).toBeGreaterThan(0)
            })
    })

    // it('returns object with # of users <= than limit', async()=>{
    //     await supertest(app).get('/users?limit=1')
    //         .expect(200)
    //         .then(res =>{
    //             expect(res.body.users).toBeInstanceOf(Array)
    //             expect(res.body.users.length).toBe(1)
    //         })
    // })

})