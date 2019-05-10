module ApplicationHelper
	def move_flash_messages?
    params[:controller] == "game" #&& params[:action] == "show"
  end
end
