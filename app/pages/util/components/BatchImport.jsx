import React from 'react'

let BatchImport = React.createClass({
  _closeAdd: function() {
    $('#batchimport').modal('hide');
  },
  _addSubmit: function() {
    $('#batchimport').modal('hide');
  },
  render: function() {
    return (
      <div>
        <div className="modal fade" id="batchimport" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" style={{
            paddingLeft: '10%'
          }}>
            <div className="modal-content " style={{
              width: '80%'
            }}>
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" aria-hidden="true" onClick={this._closeAdd}>
                      &times;
                    </button>
                    <h4 className="modal-title" id="myModalLabel">批量导入</h4>
                  </div>
                  <form onSubmit={this._addSubmit} encType="multipart/form-data" className="smart-form">
                  <div className="modal-body">
                    <fieldset style={{
                      paddingLeft: '5%',
                      paddingRight: '5%'
                    }}>
                      <section>
                        <div className="col-md-12">
                          <section>
                            <button className="btn btn-primary btn-sm">模板下载</button>
                          </section>
                          <section>
                            <div className="input input-file">
                              <span className="button">
                                <input type="file" name="file"/>
                                <span>添加</span>
                              </span>
                              <input type="text" placeholder="" readOnly/>
                            </div>
                          </section>
                        </div>
                      </section>
                    </fieldset>
                  </div>
                  <footer>
                    <button type="button" className="btn btn-primary" onClick={this._addSubmit}>
                      上传
                    </button>
                  </footer>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
export default BatchImport
