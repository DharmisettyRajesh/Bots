const { ActivityHandler, MessageFactory,ActionTypes,ActivityTypes,CardFactory } = require("botbuilder");
const Signup = require("./models/signup.js");
const bcrypt = require("bcryptjs");
const fast2sms = require("fast-two-sms");
const nodemailer = require("nodemailer");

class EchoBot extends ActivityHandler {
  name='';
  email='';
  password='';
  phno=0;
  regex = /^[a-zA-Z ]{3,15}$/ 
  email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() {
    super();
    this.onMessage(async (context, next) => {
    
    if(context.activity.text==='hello'||context.activity.text==='hi'||context.activity.text==='hey')
    {
      await context.sendActivity('hello! how can I help you?');
      await next();
    }
    else if(context.activity.text==="hello12")
    {
        await this.getdetails();
    }
    else if(context.activity.text==='1-10000')
    {
        this.displaycollege1(context);
    }
    else if(context.activity.text==='10001-30000')
    {
        this.displaycollege2(context);
    }
    else if(context.activity.text==='>30000')
    {
        this.displaycollege3(context);
    }
    else if(context.activity.text==='andhra university' || context.activity.text==='lendi' || context.activity.text==='gayatri'|| context.activity.text==='gitam')
    {
        await context.sendActivity('Thank you  for choosing the college','');
        await context.sendActivity('To continue further please enter you name','');
        await context.sendActivity('while entering name start with \" my name is \" followed by your name');

    }
    else if(context.activity.text==='vignan' ||context.activity.text==='anits' || context.activity.text ==='gmr'||context.activity.text==='lpu')
    {
        await context.sendActivity('Thank you  for choosing the college','');
        await context.sendActivity('To continue further please enter you name','');
        await context.sendActivity('while entering name start with \" my name is \" followed by your name');
    }
    else if(context.activity.text==='avanthi' || context.activity.text==='miracle'||context.activity.text==='vits'||context.activity.text==='raghu')
    {
        await context.sendActivity('Thank you  for choosing the college','');
        await context.sendActivity('To continue further please enter you name','');
        await context.sendActivity('while entering name start with \" my name is \" followed by your name');
    }
    
    else if(context.activity.text.toLowerCase().substring(0,10)==="my name is") {
        var str=context.activity.text.toLowerCase().substring(11,context.activity.text.length);
        if(!this.regex.test(str))
        {
                await context.sendActivity('please enter a valid name');
        }
        else{
            this.name=str;
            await context.sendActivity('please enter you email');
            await context.sendActivity('start typing email with \" my email\" followed by your mail')

        }
        
    }
    else if(context.activity.text.toLowerCase().substring(0,8)==="my email")
    {
        
        var str=context.activity.text.toLowerCase().substring(9,context.activity.text.length);
        if(!this.email.test(str))
        {
                await context.sendActivity('please enter a valid email');
        }
        else{
            this.email=str;
            await context.sendActivity('please enter your Phone Number');
        }
    }
    else if(context.activity.text.toLowerCase().substring(0,8)==='password')
    {

        var password=context.activity.text.substring(11,context.activity.length);
        this.password=password;
        await this.savedetails(
            context,
            this.name,
            this.email,
            this.password,
            this.phno
          );

    }
    else if(context.activity.text.length==10)
    {
        this.phno=parseInt(context.activity.text);
        await context.sendActivity("please netr your password in the form of \"password :\" followed by your password")

    }
    else{
        await context.sendActivity('sorry I can\'t get can you repeat once','');
    } 
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      const welcomeText = "Hello and welcome! I am Lara";
      for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
        if (membersAdded[cnt].id !== context.activity.recipient.id) {
          await context.sendActivity(
            MessageFactory.text(welcomeText, welcomeText)
          );
          await context.sendActivity('please Enter your Eamcet rank for seeing the list of colleges');
          this.showranks(context);
        }
      }
      await next();
    });
  }
  async savedetails(context, name, email, password,phno) {
    let existingUser;
    try {
      existingUser = await Signup.findOne({ email: email });
    } catch (err) {
      this.displayImage(context, "Something went wrong please try again");
      return;
    }
    if (existingUser) {
      this.displayImage(context, "User exists already");
      return;
    }
    let encodedpassword;
    try {
      encodedpassword = await bcrypt.hash(password, 12);
    } catch (err) {
      this.displayImage(context, "Something went wrong please try again");
      return;
    }

    const createdUser = new Signup({
      name,
      email,
      password: encodedpassword,
      phno
    });
    try {
      await createdUser.save();
    } catch (err) {
      this.displayImage(context, "Something went wrong please try again");
      return;
    }
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rdharmisetty523@gmail.com",
        pass: "Rajesh@523",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: "dharmisettyrajesh009@gmail.com",
      to: email,
      subject: "Successful Registration",
      html: `<h1>You are successfully registered with our Company</h1>`,
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        this.displayImage(context, "Something went wrong please try again");
        return;
      }
    });
    var options = {
      authorization:
        "0kMDadSRITlwYpKcgmQZqBriFzujnoV5UO32xP74e8A6LCyWvN8DMIhgvudKfikqO4RTCZtjXasw0NQ5",
      message:
        "you are registered successfully with our company for more details contact us",
      numbers: [phno],
    };
    fast2sms.sendMessage(options);
    await context.sendActivity("Your details saved successfully", "");
  }
  async displayImage(context, name) {
    await context.sendActivity(name, '');
  }
  async getdetails()
   {
       Signup.find().then((data)=>{
            console.log(data);
       });
   }
  async displaycollege1(turncontext)
  {
    const reply = { type: ActivityTypes.MessageFactory };
    const buttons = [
        { type: ActionTypes.ImBack, title: '1. Andhra University', value: 'andhra university' },
        { type: ActionTypes.ImBack, title: '2. Lendi', value: 'lendi' },
        { type: ActionTypes.ImBack, title: '3. Gitam', value: 'gitam' },
        { type:ActionTypes.ImBack,title:'4.Gayatri',value:'gayatri'}
    ];

    const card = CardFactory.heroCard('', undefined,
        buttons, { text: 'Click on the college you are interested' });
    reply.attachments= [card];
    await turncontext.sendActivity(reply);
  }
  async displaycollege2(turncontext)
  {
    const reply = { type: ActivityTypes.MessageFactory };
    const buttons = [
        { type: ActionTypes.ImBack, title: '1.Vignan', value: 'vignan' },
        { type: ActionTypes.ImBack, title: '2. Anits', value: 'anits' },
        { type: ActionTypes.ImBack, title: '3. GMR', value: 'gmr' },
        { type:ActionTypes.ImBack,title:'4.LPU',value:'lpu'}
    ];

    const card = CardFactory.heroCard('', undefined,
        buttons, { text: 'Click on the college you are interested' });
    reply.attachments= [card];
    await turncontext.sendActivity(reply);
  }
  async displaycollege3(turncontext)
  {
    const reply = { type: ActivityTypes.MessageFactory };
    const buttons = [
        { type: ActionTypes.ImBack, title: '1. Raghu', value: 'raghu' },
        { type: ActionTypes.ImBack, title: '2. Avanthi', value: 'avanthi' },
        { type: ActionTypes.ImBack, title: '3. Miracle', value: 'miracle' },
        { type:ActionTypes.ImBack,title:'4.VITS',value:'vits'}
    ];

    const card = CardFactory.heroCard('', undefined,
        buttons, { text: 'Click on the college you are interested' });
    reply.attachments= [card];
    await turncontext.sendActivity(reply);
  }
  async showranks(turncontext)
  {
    const reply = { type: ActivityTypes.MessageFactory };
        const buttons = [
            { type: ActionTypes.ImBack, title: '1-10000', value: '1-10000' },
            { type: ActionTypes.ImBack, title: '10001-30000', value: '10001-30000' },
            { type: ActionTypes.ImBack, title: '>30000', value: '>30000' }
        ];

        const card = CardFactory.heroCard('', undefined,
            buttons, { text: 'click button based on you rank' });
        reply.attachments= [card];
        await turncontext.sendActivity(reply);
  }
  
}

module.exports.EchoBot = EchoBot;
