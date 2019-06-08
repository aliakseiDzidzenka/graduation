class PlanesController < ApplicationController
	before_action :authenticate_user!
	before_action :set_plane
	before_action :set_purchase_result



	def index
		@user_plane_names = Array.new
  	current_user.planes.each { |plane| @user_plane_names.push(plane.name) }
  	@airplanes = Plane.all
  	@purchace_result = session[:purchace_result]
  	session[:purchace_result] = 'empty'
	end

	def update


  	@plane = Plane.find(params[:id])
  	#current_user.crystal.quantity = 1000

  	if current_user.planes.find(@plane.id)	
  		redirect_to planes_path
  	end
  	
  	rescue ActiveRecord::RecordNotFound
  		
  	if current_user.crystal.quantity >= @plane.price
  		current_user.crystal.quantity -= @plane.price 
 			current_user.crystal.save
 			current_user.planes << @plane
 			session[:purchace_result] = 'done'
 		else
 			session[:purchace_result] = 'failed'
  	end


  	redirect_to planes_path

	end

	def par
		puts '***************'
		puts params[:s]
		puts '***************'
	end

	private

  def set_plane
    # cookies[:username] = current_user.email || 'guest'
    # cookies[:user_id] = current_user.id || nil
    cookies[:selected] ||= 'default'
  end

  def set_purchase_result
  	session[:purchace_result] ||= 'empty'
  end

end
