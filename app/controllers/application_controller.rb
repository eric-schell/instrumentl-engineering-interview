class ApplicationController < ActionController::Base
  def ensure_json_request
    return if request.format == :json
    head :not_acceptable
  end

  def app(status: request.path == '/' ? :ok : :not_found)
    render(status: status, template: 'application/app')
  end
end
