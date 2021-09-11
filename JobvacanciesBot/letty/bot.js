const { ActivityHandler, MessageFactory,ActionTypes,CardFactory,ActivityTypes } = require('botbuilder');

class EchoBot extends ActivityHandler {
        frontend=4;
        backend=4;
        fullstack=4;
        tester=4;
        regex = /^[a-zA-Z ]{3,15}$/ 
        email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    constructor() {
        

        super();
        this.onMessage(async (context, next) => {
            if(context.activity.text==="frontend") {
                 if(this.frontend>=1)
                 {
                     this.frontend --;
                    await context.sendActivity('Thank you for choosing the front end developer job.\n\n To continue for further updates please Enter name ')
                    await context.sendActivity('while entering name start with my name is followed by your name');
                 }
                 else{
                     await context.sendActivity('Thank you for showing Sorry to say that job vacanies are completed for frontend development please choose another job to continue further');
                     await this.displayOptions(context);
                 }   
                }
            else if(context.activity.text==="backend") {
                if(this.backend>=1)
                 {
                     this.backend --;
                    await context.sendActivity('Thank you for choosing the Back end developer job. \n\nTo continue for further updates please Enter name ')
                    await context.sendActivity('while entering name start with my name is followed by your name');
                 }
                 else{
                     await context.sendActivity('Thank you for showing Interest towards register in our job portal but Sorry to say that job vacanies are completed for Backend development please choose another job to continue further');
                     await this.displayOptions(context);
                 }   

            }
            else if(context.activity.text==="fullstack") {
                if(this.fullstack>=1)
                 {
                     this.fullstack --;
                    await context.sendActivity('Thank you for choosing the Full Stack  developer job.\n\nTo continue for further updates please Enter name ')
                    await context.sendActivity('while entering name start with my name is followed by your name');
                 }
                 else{
                     await context.sendActivity('Thank you for showing Interest towrads register job  in our job portal but Sorry to say that job vacanies are completed for full stack development please choose another job to continue further');
                     await this.displayOptions(context);
                 }   

            }
            else if(context.activity.text==="tester") {
                if(this.tester>=1)
                 {
                     this.tester --;
                    await context.sendActivity('Thank you for choosing the Tester job.\n\nTo continue for further updates please Enter name ')
                    await context.sendActivity('while entering name start with \"my name is \" followed by your name');
                 }
                 else{
                     await context.sendActivity('Thank you for showing Interest towrads register job in our job portal but Sorry to say that job vacanies are completed for testing please choose another job to continue further');
                     await this.displayOptions(context);
                 }   

            }
            else if(context.activity.text.toLowerCase().substring(0,10)==="my name is") {
                var str=context.activity.text.toLowerCase().substring(11,context.activity.text.length);
                if(!this.regex.test(str))
                {
                        await context.sendActivity('please enter a valid name');
                }
                else{
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
                    await context.sendActivity('please enter your Phone Number');
                }
            }
            else if(context.activity.text.length===10)
            { 
                
                await context.sendActivity('Do you any FAQ  click the button to go to our official web site')
                const card = CardFactory.heroCard(
                    'Welcome to Miracle Istitutions!',
                    'Welcome to Welcome Miracle bot sample!',
                    ['data:image/png;base64,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'],
                    [
                        {
                            type: ActionTypes.OpenUrl,
                            title: 'Get an overview',
                            value: 'https://www.miraclesoft.com/',
                            backgroundColor:"red" 
                        },
                        {
                            type: ActionTypes.OpenUrl,
                            title: 'Ask a question',
                            value: 'https://www.glassdoor.co.in/Interview/Miracle-Software-Systems-Interview-Questions-E15484.htm'
                        },
                        {
                            type: ActionTypes.OpenUrl,
                            title: 'Achievements',
                            value: 'https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-deploy-azure?view=azure-bot-service-4.0'
                        }
                    ]
                );
                await context.sendActivity({attachments:[card]});
                await context.sendActivity('Thank you','');
            }
            else if (context.activity.text=="thank you") {
                await context.sendActivity('Welcome.','');
                await context.sendActivity('Are you interested for applying one more job say yes or no');
                

            }
            else if(context.activity.text==="yes")
            {
                await this.displayOptions(context);   
            }
            else if(context.activity.text==="no")
            {
                await context.sendActivity('Bye ......','')
            }

            else{
                await context.sendActivity('sorry I can\'t Understand can you say it again','');
            }
            await next();
        });
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello I am Letty');
                    await context.sendActivity('Welcome to the Job Vaccancies Portal and here are the list of Jobs avilable');
                    await context.sendActivity('Alternatively, You can click on the Job if you are interested to register');
                    await this.displayOptions(context);
                }
            }
            await next();
        });
    }
    async displayOptions(turnContext) {
        const reply = { type: ActivityTypes.MessageFactory };
        const buttons = [
            { type: ActionTypes.ImBack, title: '1. Front End Developer', value: 'frontend' },
            { type: ActionTypes.ImBack, title: '2. Back end Developer', value: 'backend' },
            { type: ActionTypes.ImBack, title: '3. Full Stack developer', value: 'fullstack' },
            { type:ActionTypes.ImBack,title:'4.Tester',value:'tester'}
        ];

        const card = CardFactory.heroCard('', undefined,
            buttons, { text: 'Click on the Job you are interested' });
        reply.attachments= [card];
        await turnContext.sendActivity(reply);

    const vaccancies=`Number of  vacancies available List\n\n 1.Front End ----${this.frontend}\n\n2.Back end ----${this.backend} \n\n 3.Full Stack ----${this.fullstack}\n\n4.Tester ----${this.tester}`
    await turnContext.sendActivity(vaccancies,'');
    }
}

module.exports.EchoBot = EchoBot;
