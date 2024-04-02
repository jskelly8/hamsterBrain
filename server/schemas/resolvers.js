const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find();
        },
        profile: async (parent, {profileId}) => {
            return Profile.findOne({ _id: profileId});
        },
        me: async (parent, args, context) => {
            if (context.user){
                return Profile.findOne({ _id: context.user._id});
            }
            throw AuthenticationError;
        }
    },

    Mutation: {
        addProfile: async (parent, {name, email, password}) => {
            const profile = await Profile.create({name, email, password});
            const token = signToken(profile);

            return {token, profile};
        },
        login: async (parent, {email, password}) => {
            const profile = await Profile.findOne({ email });

            if (!profile){
                throw AuthenticationError
            }
            const rightPw = await profile.isCorrectPassword(password);

            if (!rightPw) {
                throw AuthenticationError;
            }

            const token = signToken(profile);
            return {token, profile};
        },
        editProfile: (parent, {input}, context) => {
           if (!context.profile){
            throw AuthenticationError;
           }
           try{
           const user = context.profile;
            if(!user){
                throw Error();
            }
            if(input.name){
                profile.name = input.name;
            }
            if(input.username){
                profile.username = input.username;
            }
            if(input.email){
                profile.email = input.email;
            }
            if(input.buddyemail){
                profile.buddyemail = input.buddyemail;
            }
            if(input.password){
                profile.password = input.password;
            }        
        }
        catch(err){
            throw Error();
        }
    }    
}};

module.exports = resolvers;