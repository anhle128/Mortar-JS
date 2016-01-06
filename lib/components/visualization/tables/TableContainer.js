var React           = require('react/addons');
var Table           = require('./Table');
var Actions         = require('../buttons/actions/ActionsDropdown');
var PageSearch      = require('../page-search/PageSearch');
var PerPageSelector = require('../paginator/PerPageSelector');

/**
 * Wrapper component for tables
 *
 * @type {*|Function}
 */
var TableContainer = React.createClass({
	propTypes: {
		title    : React.PropTypes.string.isRequired,
		data     : React.PropTypes.array.isRequired,
		dataKeys : React.PropTypes.object.isRequired,

		// Object of table column names and resource property keys
		options  : React.PropTypes.shape({
			editableRows    : React.PropTypes.bool,
			// Whether to include Edit/Deactivate buttons
			actionableRows  : React.PropTypes.bool,
			// Is the table drag sortable
			draggable       : React.PropTypes.bool,
			// Callback to handle Edit/Deactivate @todo they should be standardized and automated
			actionsCallback : React.PropTypes.func,
			// Array of button actions
			actions         : React.PropTypes.array,
			// Data presentation mutators
			mutators        : React.PropTypes.object,
			summableRows    : React.PropTypes.array
		}),
		// The action creator through which to call actions such as table sort, deletion, etc
		actionCreator: React.PropTypes.object
	},

	getDefaultProps: function () {
		return {
			data: []
		}
	},

	render: function () {
		if (this.props.options && this.props.options.noPanel) {
			return (
				<div className="table-responsive">
					<Table key={this.props.title} {...this.props} />
				</div>
			);
		}

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<i className="fa fa-table fa-fw"></i> {this.props.title}
				</div>

				<div className="panel-body">
					<div className="row">
						<div className="col-lg-12">
							<div className="table-responsive">
								<Table key={this.props.title} {...this.props} />
							</div>

						</div>
					</div>
				</div>

			</div>
		)
	}
});

module.exports = TableContainer;