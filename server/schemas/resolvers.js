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
        }
    }    
    };

module.exports = resolvers;