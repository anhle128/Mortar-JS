var _          = require('lodash');
var React      = require('react/addons');
var classNames = require('classnames');

/**
 * Table sum rows component
 *
 * @type {*|Function}
 */
var SumRow = React.createClass({
	propTypes: {
		data     : React.PropTypes.object.isRequired,
		dataKeys : React.PropTypes.object.isRequired,
		rows     : React.PropTypes.array.isRequired,
		options  : React.PropTypes.object
	},

	buildRowData: function () {
		var dataKeys = this.props.dataKeys,
			sumRows  = this.props.rows,
			data     = _.cloneDeep(this.props.data[0]),
			sums     = {};

		// First, we start by getting the sum of all keys that are summable.
		// We loop through all the data keys, and each summable row,
		// take the value of any keys that match, and add them to our running total
		this.props.data.forEach(function (datum) {
			sumRows.forEach(function (key) {
				sums[key] = sums[key] || 0; // if it doesn't have a value, we need to set it to 0 so we don't get NAN
				sums[key] += datum[key];
			});
		});

		// Next, we create the data for our table cells.
		// Any data key that is in the table is either given it's summed value or an empty string.
		for (var key in dataKeys) {
			sumRows.forEach(function (total) {
				if (dataKeys[key] === total) {
					data[total] = sums[total];
				} else {
					data[dataKeys[key]] = '';
				}
			});
		}

		var rowData = data,
			colSpan = 0;

		var rowKeys = Object.keys(dataKeys).map(function (value, index) {
			return dataKeys[value];
		});

		// Finally, we construct the table row with the sum data.
		var rowData = rowKeys.map(function (column, index) {
			var cellValue = _.get(rowData, column);

			// If it's the last cell, and empty then we put a cell on the table.
			if (cellValue === '' && index + 1 == rowKeys.length) {
				return <td colSpan={colSpan + 1} />;
			}

			// If the cell has no value, we don't put a cell.
			else if (cellValue === '') {
				colSpan++;
				return;
			} else {
				// If a cell has value we put an empty cell before it for spacing, and then the summed value
				var cols = _.clone(colSpan);
				colSpan = 0;
				content = [];

				if (cols) {
					content.push(<td colSpan={cols} />);
				}

				content.push(<td key={index}>{this.mutateData(column, cellValue, rowData) || cellValue}</td>)
				return content;
			}
		}.bind(this));

		// Finally, if ther are actionable rows, or bulk actions, we want to add columns for those
		if (this.props.options && this.props.options.actionableRows) {
			rowData.push(<td />);
		}

		if (this.props.options && this.props.options.bulkActions) {
			rowData.unshift(<td />);
		}

		return rowData;
	},

	/**
	 * Handle any custom data presentation mutators
	 *
	 * @param object
	 * @returns {*}
	 */
	mutateData: function (column, value, row) {
		if (value === '') {
			return value;
		}

		var mutators = this.props.options.mutators || {};
		var mutatorFx = mutators[column];
		// @todo necessary to pass the object back? Could be convenient..
		return mutatorFx ? mutatorFx(value, row) : value;
	},

	render: function () {
		var tableCols = 0, key;
		for (key in this.props.dataKeys) {
			if (this.props.dataKeys.hasOwnProperty(key)) {
				tableCols++;
			}
		}

		if (this.props.options.actionableRows) {
			tableCols++;
		}

		if (this.props.options.bulkActions) {
			tableCols++;
		}

		return (
			<div>
				<tr className={'table-row'}>
					<th colSpan={tableCols}> Total: </th>
				</tr>
				<tr className={'table-row'}>
					{this.buildRowData()}
				</tr>
			</div>
		);
	}
});

module.exports = SumRow;