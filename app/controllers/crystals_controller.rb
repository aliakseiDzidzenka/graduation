class CrystalsController < ApplicationController
	before_action :authenticate_user!


	def show
		@crystal = Crystal.find(params[:id])
	end

	def edit
  	@crystal = Crystal.find(params[:id])
	end


	def update
		@crystal = Crystal.find(params[:id])
		@crystal.quantity += params[:crystal][:quantity].to_i
  	@crystal.save

	end

end
