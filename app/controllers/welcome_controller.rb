class WelcomeController < ApplicationController
 protect_from_forgery except: :load
  def index
  end

  def load
  	send_file Rails.root.join("flamingo.js")
  end
end
