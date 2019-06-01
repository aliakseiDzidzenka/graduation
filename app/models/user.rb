class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one :crystal
  after_create :add_crystals

  # validates :email, uniqueness: true
  # validates :email, presence: true


  # validates_associated :crystal

  def add_crystals
  	self.crystal = Crystal.new
  end
end
