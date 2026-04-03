const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

// Temporary Seed Logic to Fix Jaun Elia Section
const Shayri = require('./models/Shayri');
const seedDB = async () => {
  try {
    const count = await Shayri.countDocuments({ poet: /Jaun Elia/i });
    if (count < 30) {
      console.log('Seeding Database...');
      const shayris = [
        // Mirza Ghalib (30)
        { text: "Hazaron khwahishen aisi ke har khwahish pe dam nikle, Bohat nikle mere armaan lekin phir bhi kam nikle.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Dil hi to hai na sang-o-khisht, dard se bhar na aaye kyun, Royenge hum hazaar baar, koi humein sataye kyun.", poet: "Mirza Ghalib", category: "dard", language: "roman" },
        { text: "Ishq par zor nahi hai ye wo aatish Ghalib, Jo lagaye na lage aur bujhaye na bane.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Koi umeed bar nahi aati, koi surat nazar nahi aati, Maut ka ek din muayyan hai, neend kyun raat bhar nahi aati.", poet: "Mirza Ghalib", category: "dard", language: "roman" },
        { text: "Ragon mein daudte phirne ke hum nahi qaayal, Jab aankh hi se na tapka to phir lahu kya hai.", poet: "Mirza Ghalib", category: "attitude", language: "roman" },
        { text: "Bas ke dushwar hai har kaam ka asaan hona, Aadmi ko bhi mayassar nahi insaan hona.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Ye na thi hamari qismat ke visaal-e-yaar hota, Agar aur jeete rehte yahi intezaar hota.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Dil-e-nadaan tujhe hua kya hai, Aakhir is dard ki dawa kya hai.", poet: "Mirza Ghalib", category: "dard", language: "roman" },
        { text: "Ishq ne Ghalib nikamma kar diya, Warna hum bhi aadmi the kaam ke.", poet: "Mirza Ghalib", category: "attitude", language: "roman" },
        { text: "Na tha kuch to khuda tha, kuch na hota to khuda hota, Duboya mujh ko hone ne, na hota main to kya hota.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Hain aur bhi duniya mein sukhanwar bahut achhe, Kehte hain ke Ghalib ka hai andaaz-e-bayaan aur.", poet: "Mirza Ghalib", category: "attitude", language: "roman" },
        { text: "Ye kahan ki dosti hai ke bane hain dost naseh, Koi chara saaz hota koi ghamgusar hota.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Humko maloom hai jannat ki haqeeqat lekin, Dil ko khush rakhne ko Ghalib ye khayal achha hai.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Mohabbat mein nahi hai farq jeene aur marne ka, Usi ko dekh kar jeete hain jis kafir pe dam nikle.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Unke dekhe se jo aa jaati hai muh par raunaq, Wo samajhte hain ke beemar ka haal achha hai.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Aaina kyun na doon ke tamaasha kahe jise, Aaisa kahan se laaun ke tujh sa kahe jise.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Qaid-e-hayat aur band-e-gham asl mein dono ek hain, Maut se pehle aadmi gham se nijaat paaye kyun.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Har ek baat pe kehte ho tum ke tu kya hai, Tumhi kaho ke ye andaaz-e-guftagu kya hai.", poet: "Mirza Ghalib", category: "attitude", language: "roman" },
        { text: "Wo aaye ghar mein hamare khuda ki qudrat hai, Kabhi hum unko kabhi apne ghar ko dekhte hain.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Dard minnat-kash-e-dawa na hua, Main na achha hua bura na hua.", poet: "Mirza Ghalib", category: "dard", language: "roman" },
        { text: "Ibn-e-maryam hua kare koi, Mere dukh ki dawa kare koi.", poet: "Mirza Ghalib", category: "dard", language: "roman" },
        { text: "Dil se teri nigah jigar tak utar gayi, Do hi mein thi ke teer nazar tak utar gayi.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Kahan maikada ka darwaza Ghalib aur kahan waiz, Par itna jaante hain kal wo jaata tha ke hum nikle.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Ishq mujh ko nahi wehshat hi sahi, Meri wehshat teri shohrat hi sahi.", poet: "Mirza Ghalib", category: "love", language: "roman" },
        { text: "Phir mujhe deed-e-tar yaad aaya, Dil jigar tashna-e-faryad aaya.", poet: "Mirza Ghalib", category: "dard", language: "roman" },
        { text: "Hua jab gham se yun behis to gham kya sar ke katne ka, Na hota gar juda tan se to zaano par dhara hota.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Nikalna khuld se Adam ka sunte aaye hain lekin, Bohat be-aabroo ho kar tere kuche se hum nikle.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Karz ki peete the mai lekin samajhte the ke haan, Rang laayegi hamari faaqa-masti ek din.", poet: "Mirza Ghalib", category: "attitude", language: "roman" },
        { text: "Ye masaail-e-tasawwuf ye tera bayan Ghalib, Tujhe hum wali samajhte jo na baada-khwar hota.", poet: "Mirza Ghalib", category: "philosophy", language: "roman" },
        { text: "Bana hai shah ka musahib phire hai itraata, Wagarna shehar mein Ghalib ki aabroo kya hai.", poet: "Mirza Ghalib", category: "attitude", language: "roman" },

        // Jaun Elia (30)
        { text: "Main bhi bohot ajeeb hoon itna ajeeb hoon ke bas, Khud ko tabaah kar liya aur malaal bhi nahi.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Ab nahi koi baat khatre ki, Ab sabhi ko sabhi se khatra hai.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Tum mera naam kyun nahi leti, Mujh se milne kyun nahi aati.", poet: "Jaun Elia", category: "love", language: "roman" },
        { text: "Kya sitam hai ke ab teri surat, Ghaur karne pe yaad aati hai.", poet: "Jaun Elia", category: "love", language: "roman" },
        { text: "Hum kahan ke dana the kis hunar mein yakta the, Be-sabab dushman hua aasman apna.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Zindagi kis tarah basar hogi, Dil nahi lag raha mohabbat mein.", poet: "Jaun Elia", category: "love", language: "roman" },
        { text: "Ek hi hadsa to hai aur wo ye ke aaj tak, Baat nahi kahi gayi baat nahi suni gayi.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Kitne aish se rehte honge kitne itraate honge, Jaane kaise log wo honge jo usko bhaate honge.", poet: "Jaun Elia", category: "love", language: "roman" },
        { text: "Ab to har baat yaad rehti hai, Ghalat aur sahi ka kya karna.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Shayad mujhe kisi se mohabbat nahi hui, Lekin yaqeen sab ko dilata raha hoon main.", poet: "Jaun Elia", category: "attitude", language: "roman" },
        { text: "Main bhi bohot ajeeb hoon itna ajeeb hoon ke bas, Khud ko tabaah kar liya aur malaal bhi nahi.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Kisi se koi bhi umeed rakhna, Yeh sab se bada dhoka hai.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Dil ki takleef kam nahi hoti, Ab koi marham bhi nahi milta.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Mujh se mil kar udaas kyun hai, Kya mujhe pehchaan liya hai.", poet: "Jaun Elia", category: "love", language: "roman" },
        { text: "Main ne maana ke kuch nahi hoon main, Phir bhi tujh se kam nahi hoon main.", poet: "Jaun Elia", category: "attitude", language: "roman" },
        { text: "Aaj kal main bohot udaas rehta hoon, Aaj kal main kisi se baat nahi karta.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Koi mujh tak nahi pohanchta hai, Is qadar faasla ho gaya hoon main.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Main jo hoon wo hoon, Aur jo nahi hoon wo ban nahi sakta.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Zindagi ek khwab hai, Aur khwab bhi adhoora hai.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Main bhi khush tha kabhi, Ab to sirf yaadein reh gayi hain.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Dil ko kisi ki aadat ho gayi hai, Aur wo aadat bhi buri ho gayi hai.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Mohabbat kar ke dekha hai, Bas dard hi mila hai.", poet: "Jaun Elia", category: "love", language: "roman" },
        { text: "Ab to khud se bhi baat nahi hoti, Itna tanha ho gaya hoon main.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Kuch log zindagi mein aise aate hain, Jo sirf dard de jaate hain.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Main kisi ka nahi raha, Aur koi mera nahi raha.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Ajeeb sa dard hai dil mein, Jo kisi ko samajh nahi aata.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Main toot chuka hoon andar se, Par muskura raha hoon bahar se.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Ab kisi se koi gila nahi, Bas khud se hi shikayat hai.", poet: "Jaun Elia", category: "dard", language: "roman" },
        { text: "Zindagi se thak chuka hoon, Ab sukoon chahta hoon.", poet: "Jaun Elia", category: "philosophy", language: "roman" },
        { text: "Main khud se hi haar gaya hoon, Aur ab jeetne ki himmat nahi.", poet: "Jaun Elia", category: "philosophy", language: "roman" }
      ];
      await Shayri.insertMany(shayris);
      console.log('Database Seeded Successfully!');
    }
  } catch (err) {
    console.error('Seed Error:', err.message);
  }
};
seedDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/auth');
const shayriRoutes = require('./routes/shayri');
const favoritesRoutes = require('./routes/favorites');

app.use('/api/auth', authRoutes);
app.use('/api/shayri', shayriRoutes);
app.use('/api/favorites', favoritesRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Shayri Book API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
