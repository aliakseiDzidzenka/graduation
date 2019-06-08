class GameController < ApplicationController
	before_action :authenticate_user!, except: :test
	before_action :set_user, except: :test


	def index
		@user = current_user
		@crystal = current_user.crystal
		#@key = "you will not hack us"
  end

  def plane
    @planes = Array.new
  	current_user.planes.each { |plane| @planes.push(plane.name) }
  end

  def test
  	
  end

  def par
    puts '*************'
    puts params[:s]
    puts '*************'
    #redirect_to planes_par_path(param1: 'value', ...)
  end

  private

  def set_user
    cookies[:username] = current_user.email || 'guest'
    cookies[:user_id] = current_user.id || nil
    cookies[:selected] ||= 'default'
  end

end
