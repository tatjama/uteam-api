import { ProfileDto, createProfileDto } from '../dto/profile.dto';
import { ProfileUpdateDto} from '../dto/profile.update.dto';
import { ProfileModel, Profile} from '../models/Profile';
import { User } from '../models/User';
import { Company } from '../models/Company';

class ProfilesDao{
    createProfile = async (profileUpdateDto: ProfileUpdateDto): Promise<number> => {
        const profile: ProfileModel = await Profile.create(profileUpdateDto, {
            include: [ {model: User }, {model: Company}             
            ]});
        return profile.id;
    }

    getProfiles = async ( page: number, limit: number): Promise<ProfileDto[]> => {
        const profiles: ProfileModel[] | null= await Profile.findAll(            
                {
                    offset: page *limit | 0, 
                    limit:limit | 20,
                    include:[ {model: User }, {model:Company, required: false}]
                 }
            );
        //profiles.map(profile => console.log(profile.toJSON()));
        return profiles.map(profile => 
            createProfileDto( profile.id, profile.name, profile.profilePhoto, profile.status, 
                profile.getDataValue('user'), profile.getDataValue('company')));
    }

    getProfileById = async ( profileId: string ): Promise<ProfileDto | null> => {
        const profile: ProfileModel | null  = await Profile.findByPk(profileId, {
            include:[ {model: User }, {model: Company, required: false}],
        });
        return profile? createProfileDto(profile.id, profile.name, profile.profilePhoto, profile.status, 
            profile.getDataValue('user'), profile.getDataValue('company')): null;
    }   

    
    isProfileExistByUserId = async (userId:string): Promise<boolean> => {
        const profile: ProfileModel | null = await Profile.findOne({ where: {UserId: userId}});
        return profile? true : false;
    }

    updateProfileById = async (profileUpdateDto: ProfileUpdateDto): Promise<ProfileDto | null> => {
         await Profile.update({ name: profileUpdateDto.name, profilePhoto: profileUpdateDto.profilePhoto
            , CompanyId: profileUpdateDto.CompanyId}, {
             where: { 
              id: profileUpdateDto.id,   
             }
         })
         const updatedProfile: ProfileModel | null= await Profile.findByPk(profileUpdateDto.id, {
              include:[ {model: User }, {model: Company, required: false}],
        });
        return updatedProfile? createProfileDto(updatedProfile.id, updatedProfile.name, updatedProfile.profilePhoto, 
                updatedProfile.status, updatedProfile.getDataValue('user'), updatedProfile.getDataValue('company')) 
                : null;     
    }

    deleteById = async ( profileId: string): Promise<void> => {
            await Profile.destroy({ where: { id: profileId}});
    }

}

export default new ProfilesDao();