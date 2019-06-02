class WelcomeController < ApplicationController
 protect_from_forgery except: :load
 before_action :set_plane
  def index
  end

  private

  def set_plane
    # cookies[:username] = current_user.email || 'guest'
    # cookies[:user_id] = current_user.id || nil
    if current_user
    	cookies[:selected] ||= 'default'
    end
  end
end
