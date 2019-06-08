class CrystalsController < ApplicationController
	before_action :authenticate_user!


	def show
		@crystal = Crystal.find(params[:id])
	end

	def edit
  	@crystal = Crystal.find(params[:id])
	end


	def update
		# puts '*************'
  #   puts params[:s]
  #   puts params[:id]
  #   puts '*************'
		
		@crystal = Crystal.find(params[:id])
		@crystal.quantity += params[:resource][:crystals].to_i#[:quantity].to_i
  	@crystal.save

	end

end
