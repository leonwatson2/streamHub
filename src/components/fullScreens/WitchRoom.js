import React, { Component } from 'react';
import '../../styles/witch.css';
export default class WitchRoom extends Component {
  componentWillMount() {
    const main = `height: 100%;
        width: 100%;
        overflow: hidden;
        padding: 0;
        margin: 0;`;

    document.getElementsByTagName('html')[0].style = main;
    document.body.style = `${main} background: #500d78;
        display: flex;
        align-items: center;
        justify-content: center;`;
  }
  render() {
    return (
      <div className='witch-wrapper'>
        <div className='witch-container'>
          <div className='shelf-one'>
            <div className='shelf shadow'>
              <div className='shelf-hooks' />
              <div className='base' />
              <div className='crystal-ball'>
                <div className='stand' />
                <div className='ball' />
              </div>
              <div className='bottle bottle-1'>
                <div className='bowl' />
                <div className='bottle-neck' />
                <div className='bottle-top' />
              </div>
              <div className='drippings'>
                <div className='drip' />
              </div>
              <div className='bottle bottle-3'>
                <div className='bowl' />
                <div className='bottle-neck' />
                <div className='bottle-top' />
              </div>
            </div>
            <div className='shelf'>
              <div className='shelf-hooks' />
              <div className='base' />
              <div className='crystal-ball'>
                <div className='stand' />
                <div className='ball'>
                  <div className='ball-highlight' />
                </div>
              </div>
              <div className='bottle bottle-1'>
                <div className='bowl'>
                  <div className='bowl-in'>
                    <div className='liquid'>
                      <div className='bottle-bubble' />
                      <div className='bottle-bubble' />
                      <div className='bottle-bubble' />
                      <div className='bottle-bubble' />
                      <div className='bottle-bubble' />
                    </div>
                    <div className='bottle-reflection' />
                  </div>
                </div>
                <div className='bottle-neck' />
                <div className='bottle-top' />
              </div>
              <div className='drippings'>
                <div className='drip' />
              </div>
              <div className='bottle bottle-3'>
                <div className='bowl'>
                  <div className='bowl-in'>
                    <div className='liquid' />
                  </div>
                </div>
                <div className='bottle-neck' />
                <div className='bottle-top' />
              </div>
            </div>
          </div>
          <div className='shelf-two'>
            <div className='shelf shadow'>
              <div className='shelf-hooks' />
              <div className='base' />
              <div className='skull'>
                <div className='head' />
                <div className='teeth' />
              </div>
              <div className='candles'>
                <div className='candle'>
                  <div className='candle-wax' />
                  <div className='flame'>
                    <div className='flame-in' />
                  </div>
                </div>
                <div className='candle'>
                  <div className='candle-wax' />
                  <div className='flame'>
                    <div className='flame-in' />
                  </div>
                </div>
              </div>
            </div>
            <div className='shelf'>
              <div className='shelf-hooks' />
              <div className='base' />
              <div className='skull'>
                <div className='head'>
                  <div className='skull-stain' />
                  <div className='eye' />
                  <div className='eye' />
                  <div className='nose' />
                </div>
                <div className='teeth'>
                  <div className='tooth' />
                  <div className='tooth' />
                  <div className='tooth' />
                </div>
              </div>
              <div className='candles'>
                <div className='candle'>
                  <div className='candle-wax'>
                    <div className='wax-reflection' />
                    <div className='wax-reflection-top' />
                  </div>
                  <div className='candle-reflection' />
                  <div className='flame'>
                    <div className='flame-in' />
                  </div>
                </div>
                <div className='candle'>
                  <div className='candle-wax'>
                    <div className='wax-reflection' />
                    <div className='wax-reflection-top' />
                  </div>
                  <div className='candle-reflection' />
                  <div className='flame'>
                    <div className='flame-in' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='shelf-three'>
            <div className='shelf shadow'>
              <div className='shelf-hooks' />
              <div className='base' />
              <div className='spider-group'>
                <div className='thread' />
                <div className='spider'>
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                </div>
              </div>
              <div className='books'>
                <div className='book' />
                <div className='book' />
                <div className='book' />
                <div className='book-up' />
              </div>
              <div className='candy-bowl'>
                <div className='candy-bowl-top' />
              </div>
            </div>
            <div className='shelf'>
              <div className='shelf-hooks' />
              <div className='base' />
              <div className='spider-group'>
                <div className='thread' />
                <div className='spider'>
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                  <div className='spider-leg' />
                </div>
              </div>
              <div className='books'>
                <div className='book'>
                  <div className='details' />
                </div>
                <div className='book'>
                  <div className='details' />
                </div>
                <div className='book'>
                  <div className='details' />
                </div>
                <div className='book-up'>
                  <div className='details' />
                </div>
              </div>
              <div className='candy-bowl'>
                <div className='candy-bowl-top' />
                <div className='candy-bowl-in'>
                  <div className='candy-1' />
                  <div className='candy-1' />
                  <div className='candy-1' />
                  <div className='candy-1' />
                  <div className='candy-2'>
                    <div className='candy-reflection' />
                  </div>
                  <div className='candy-2'>
                    <div className='candy-reflection' />
                  </div>
                  <div className='candy-2'>
                    <div className='candy-reflection' />
                  </div>
                  <div className='candy-2'>
                    <div className='candy-reflection' />
                  </div>
                  <div className='candy-3' />
                  <div className='candy-3' />
                  <div className='candy-3' />
                  <div className='candy-3' />
                  <div className='candy-4'>
                    <div className='candy-reflection' />
                  </div>
                  <div className='candy-4'>
                    <div className='candy-reflection' />
                  </div>
                  <div className='candy-4'>
                    <div className='candy-reflection' />
                  </div>
                  <div className='candy-4'>
                    <div className='candy-reflection' />
                  </div>
                </div>
                <div className='candy-bowl-reflection' />
              </div>
            </div>
          </div>
          <div className='witch shadow'>
            <div className='middle' />
            <div className='right-arm'>
              <div className='bottle bottle-1'>
                <div className='bowl'>
                  <div className='bowl-in' />
                </div>
                <div className='bottle-neck' />
                <div className='bottle-top'>
                  <div className='pink-liquid' />
                </div>
              </div>
              <div className='right-hand' />
            </div>
            <div className='head-group'>
              <div className='hair-back'>
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
              </div>
              <div className='witch-head' />
              <div className='hat'>
                <div className='hat-top'>
                  <div className='hat-top-in' />
                </div>
                <div className='hat-band' />
                <div className='hat-bottom' />
              </div>
            </div>
          </div>
          <div className='witch'>
            <div className='bottom' />
            <div className='middle' />
            <div className='right-arm'>
              <div className='bottle bottle-1'>
                <div className='bowl'>
                  <div className='bowl-in'>
                    <div className='liquid' />
                    <div className='bottle-reflection' />
                  </div>
                </div>
                <div className='bottle-neck' />
                <div className='bottle-top'>
                  <div className='pink-liquid' />
                </div>
              </div>
              <div className='right-hand' />
            </div>
            <div className='head-group'>
              <div className='neck' />
              <div className='hair-back'>
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='hair' />
                <div className='witch-ears'>
                  <div className='witch-ear' />
                  <div className='witch-ear' />
                </div>
              </div>
              <div className='witch-head'>
                <div className='cheeks' />
                <div className='eyes' />
                <div className='eyes' />
                <div className='mouth' />
                <div className='mouth-hidden' />
                <div className='hair-front' />
              </div>
              <div className='hat'>
                <div className='hat-top'>
                  <div className='hat-top-in' />
                </div>
                <div className='hat-band' />
                <div className='hat-stars'>
                  <div className='hat-star' />
                  <div className='hat-star' />
                  <div className='hat-star' />
                </div>
                <div className='hat-band-top' />
                <div className='hat-bottom' />
              </div>
            </div>
          </div>
          <div className='light' />
          <div className='cauldron shadow'>
            <div className='left-arm' />
            <div className='stick-group'>
              <div className='stick' />
              <div className='hand' />
            </div>
            <div className='bubbles'>
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
            </div>
            <div className='cauldron-top' />
          </div>
          <div className='cauldron'>
            <div className='left-arm' />
            <div className='stick-group'>
              <div className='stick' />
              <div className='hand' />
            </div>
            <div className='handle' />
            <div className='bubbles'>
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
              <div className='bubble' />
            </div>
            <div className='cauldron-top' />
          </div>
          <div className='window-group shadow'>
            <div className='window' />
          </div>
          <div className='window-group'>
            <div className='window'>
              <div className='window-reflections' />
              <div className='window-reflections' />
              <div className='window-reflections'> </div>
              <div className='window-in'>
                <div className='ghost-group'>
                  <div className='ghost'>
                    <div className='bottom'>
                      <div className='bottom-part' />
                      <div className='bottom-part' />
                      <div className='bottom-part' />
                    </div>
                    <div className='eyes' />
                  </div>
                </div>
                <div className='moon'>
                  <div className='craters' />
                </div>
                <div className='stars'>
                  <div className='star' />
                  <div className='star' />
                  <div className='star' />
                  <div className='star' />
                  <div className='star' />
                </div>
              </div>
            </div>
            <div className='cat highlight'>
              <div className='cat-head'>
                <div className='ear'>
                  <div className='ear-in' />
                </div>
                <div className='ear'>
                  <div className='ear-in' />
                </div>
              </div>
              <div className='cat-body' />
              <div className='cat-paw' />
              <div className='cat-neck'>
                <div className='neck'>
                  <div className='neck'>
                    <div className='neck'>
                      <div className='neck'>
                        <div className='neck'>
                          <div className='neck'>
                            <div className='neck'>
                              <div className='neck'>
                                <div className='neck'> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='cat'>
              <div className='cat-head'>
                <div className='ear'>
                  <div className='ear-in' />
                </div>
                <div className='ear'>
                  <div className='ear-in' />
                </div>
              </div>
              <div className='cat-body' />
              <div className='cat-paw' />
              <div className='cat-neck'>
                <div className='neck'>
                  <div className='neck'>
                    <div className='neck'>
                      <div className='neck'>
                        <div className='neck'>
                          <div className='neck'>
                            <div className='neck'>
                              <div className='neck'>
                                <div className='neck' />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='cat-tail highlight'>
                <div className='tail'>
                  <div className='tail'>
                    <div className='tail'>
                      <div className='tail'>
                        <div className='tail'>
                          <div className='tail'>
                            <div className='tail'>
                              <div className='tail last' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='cat-tail shadow'>
                <div className='tail'>
                  <div className='tail'>
                    <div className='tail'>
                      <div className='tail'>
                        <div className='tail'>
                          <div className='tail'>
                            <div className='tail'>
                              <div className='tail last' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='cat-tail'>
                <div className='tail'>
                  <div className='tail'>
                    <div className='tail'>
                      <div className='tail'>
                        <div className='tail'>
                          <div className='tail'>
                            <div className='tail'>
                              <div className='tail last' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='broom shadow'>
            <div className='broom-stick'>
              <div className='bat'>
                <div className='bat-legs' />
                <div className='bat-body' />
                <div className='bat-wing' />
                <div className='bat-wing' />
                <div className='bat-ear' />
                <div className='bat-ear' />
              </div>
            </div>
            <div className='broom-hook' />
            <div className='broom-hook' />
            <div className='broom-hair'>
              <div className='broom-hair-top' />
              <div className='broom-hair-bottom' />
              <div className='broom-hair-band' />
            </div>
          </div>
          <div className='broom'>
            <div className='broom-stick'>
              <div className='broom-stick-shadow' />
              <div className='bat'>
                <div className='bat-legs' />
                <div className='bat-body' />
                <div className='bat-wing' />
                <div className='bat-wing' />
                <div className='bat-ear' />
                <div className='bat-ear' />
              </div>
            </div>
            <div className='broom-hook' />
            <div className='broom-hook' />
            <div className='broom-hair'>
              <div className='broom-hair-top' />
              <div className='broom-hair-bottom' />
              <div className='broom-lines' />
              <div className='broom-hair-bottom-reflection' />
              <div className='broom-hair-band' />
              <div className='broom-details' />
              <div className='broom-details' />
            </div>
          </div>
          <div className='pumpkins shadow'>
            <div className='pumpkin'>
              <div className='top' />
            </div>
            <div className='pumpkin'>
              <div className='top' />
            </div>
          </div>
          <div className='pumpkins'>
            <div className='pumpkin'>
              <div className='top' />
            </div>
            <div className='pumpkin'>
              <div className='top' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
