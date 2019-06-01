class PlanesController < ApplicationController
	before_action :authenticate_user!

	def index
		# @planeNames = Array.new
  	# current_user.planes.each { |plane| @planeNames.push(plane.name) }
  	@airplanes = Plane.all
	end

	def update
  	@plane = Plane.find(params[:id])

  	#current_user.crystal.quantity = 1000

  	if current_user.planes.find(@plane.id)	
  		redirect_to planes_path
  	end
  	
  	rescue ActiveRecord::RecordNotFound
  		if current_user.crystal.quantity >= @plane.cost
  			current_user.crystal.quantity -= @plane.cost 
  			current_user.crystal.save
  			current_user.planes << @plane
  			puts current_user.crystal.reload.quantity
  		end


  	#current_user.planes << @plane
  	# @article.update(title: params[:title], description: params[:description])
  	redirect_to planes_path
	end

end
