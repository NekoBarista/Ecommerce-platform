const fs = require('fs')

class UsersRepository {
constructor(fileName) {
if (!fileName) {
throw new Error ('Creating a repository requires a file name')
}
this.fileName = fileName
try {
fs.accessSync(this.fileName)
}

catch(err) {
    fs.writeFileSync(this.fileName, '[]')

}
}


async getAll() {
    // Open the file called this.filename
    return  JSON.parse(await fs.promises.readFile(this.fileName, {
      encoding: 'utf8'
    }));
  }

  async create(attributes) {
const records = await this.getAll();
records.push(attributes)

await this.writeAll(records)

  }

  async writeAll(records) {
    await fs.promises.writeFile(this.fileName, JSON.stringify(records, null, 2), {encoding: 'utf8'} )
  }
}


const test = async () => {
const repo = new UsersRepository('users.json');
await repo.create({email: "test@test.com", password: "hello"})
const users = await repo.getAll()


console.log(users)
}

test()

