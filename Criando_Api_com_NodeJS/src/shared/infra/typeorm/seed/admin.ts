import { hashSync } from "bcrypt";
import { v4 as uuidV4 } from 'uuid';
import { createConnection } from "../data-source";


async function create() { 
    const connection = await createConnection()

    const id = uuidV4()
    const password = hashSync("admin", 8)

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX' )
        `
    )

    await connection.destroy();
}

create().then(() => console.log("User admin created!"))