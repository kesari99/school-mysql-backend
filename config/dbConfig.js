// a4hqJ2nNCrYO6K4g

module.exports = {
    HOST:"gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
    USER:"3ijGcCxJAaFNkcm.root",
    PASSWORD:"a4hqJ2nNCrYO6K4g",
    DB:"test",
    PORT:4000,
    dialect:"mysql",

    pool : {
        max:5,
        min:0,
        acquire:30000,
        idle:10000

    }
}