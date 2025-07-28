//Database Connection File
import mongoose from 'mongoose';   
import chalk from 'chalk'; 
const dBConnection=async()=>
{
    try {
        const connection=await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(chalk.bgBlue(`Database Connected Successfully: ${connection.connection.host}`));
    } catch (error) {
        console.log(chalk.bgRed(`Database Connection Failed: ${error.message}`));
        process.exit(1); // Exit the process with failure
        
    }
}
export default dBConnection;