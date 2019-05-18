class GameController < ApplicationController
	before_action :authenticate_user!
	before_action :set_user

	def index

  end

  private

  def set_user
    cookies[:username] = current_user.email || 'guest'
  end

end
