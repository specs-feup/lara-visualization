if (String.prototype.splice === undefined) {
  String.prototype.splice = function(index, length, replacement) {
    return this.slice(0, index) + replacement + this.slice(index + length);
  };
}