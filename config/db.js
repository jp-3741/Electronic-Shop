import mongoose from 'mongoose'

const MONGO_DB_URI = "mongodb+srv://jaiprakash:jaiprakash@jaip.ncuu8sx.mongodb.net/?retryWrites=true&w=majority"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
