const mongoose = require('mongoose');
const {User} = require('./user-models');

const reviewSchema = mongoose.Schema({
	username: {type: String, required: true},
	businessId: {type: String, required: true},
	reviewDate: {type: Date, default: Date.now},	
	userRatings: {
		access: {type: Boolean, required: true},
		parkingSpaces: {type: Boolean, required: true},
		interiorNavigation: {type: Boolean, required: true},
		restroom: {type: Boolean, required: true},
		service: {type: Boolean, required: true},
		serviceAnimal: {type: Boolean, required: true}
	},
	reviewText: String
});

reviewSchema.virtual('businessAddress').get(function() {
	return `${this.address.building} ${this.address.street}`.trim()});

reviewSchema.virtual('username').get(function() {
	return User.username;
});


reviewSchema.methods.reviewApiRep = function() {
	return {
		id: this._id,
		businessId: this.businessId,
		username: this.username,
		userRatings: this.userRatings,
		reviewText: this.reviewText,
		reviewDate: this.reviewDate
	};
}

const Review = mongoose.model('Review', reviewSchema);

module.exports = {Review};



