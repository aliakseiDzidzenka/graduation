class GameController < ApplicationController
	before_action :authenticate_user!
	before_action :set_user


	def index
		@user = current_user
		@crystal = current_user.crystal
		@key = "you will not hack us"
  end

  def plane
  	cookies[:selected] ||= 'default'
    
  end

  def test
  	
  end

  private

  def set_user
    cookies[:username] = current_user.email || 'guest'
    cookies[:user_id] = current_user.id || nil
  end

end
