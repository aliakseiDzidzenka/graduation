class GameController < ApplicationController
	before_action :authenticate_user!, except: :test
	before_action :set_user, except: :test


	def index
		@user = current_user
		@crystal = current_user.crystal
		#@key = "you will not hack us"
  end

  def plane
  	
    
  end

  def test
  	
  end

  private

  def set_user
    cookies[:username] = current_user.email || 'guest'
    cookies[:user_id] = current_user.id || nil
    cookies[:selected] ||= 'default'
  end

end
