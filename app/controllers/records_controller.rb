class RecordsController < ApplicationController
	before_action :authenticate_user!
	
	def index
		@records = Record.all
	end

	def show
		@record = Record.find(params[:id])
	end

	def update
		@record = Record.find(params[:id])

		@crystals = params[:resource][:crystals].to_i
		@time = params[:resource][:time].to_i

		@record.crystal = @crystals if @crystals > @record.reload.crystal
		@record.save
		@record.time = @time if @time > @record.reload.time
		@record.save

		
	end
end
