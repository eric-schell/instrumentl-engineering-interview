module Api
  class FilingsController < Api::BaseController
    before_action :ensure_json_request

    def index
      @filings = Filing

      organization_id = filing_params[:organization_id]
      if organization_id.present?
        @filings = @filings.where(organization_id: organization_id)
      end

      respond_to do |format|
        format.json {
          render json: {
            filings: @filings.order(
              pagination_params[:order_by] => pagination_params[:sort_dir]
            ).page(
              pagination_params[:page].to_i
            ).per(
              pagination_params[:per_page]
            ),
            total_count: @filings.count,
            total_giving: @filings.joins(:awards).sum("awards.cash_amount + awards.non_cash_amount")
          }
        }
      end
    end

    def show
      @filing = Filing.find(filing_params[:id])

      respond_to do |format|
        format.json { render json: @filing }
      end
    end

    def default_order_by
      "tax_period"
    end

    def filing_params
      params.permit(:id, :organization_id)
    end
  end
end
