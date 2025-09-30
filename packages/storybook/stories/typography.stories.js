export default {
  title: 'Typography',
};

export const Default = () => {
  const sample = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const fonts = [
    { name: 'Sans', classPrefix: 'vads-u-font--sans-' },
    { name: 'Mono', classPrefix: 'vads-u-font--mono-' },
    { name: 'Serif', classPrefix: 'vads-u-font--serif-' },
  ];
  return (
    <>
      {sizes.map((size) => (
        <table key={size} style={{ marginBottom: '2rem', borderCollapse: 'collapse', width: '240px' }}>
          <thead>
            <tr>
              {fonts.map((font) => (
                <th key={font.name} style={{ border: '1px solid #ccc', padding: '4px' }}>{font.name} {size}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sample.map((char, i) => (
              <tr key={char + i}>
                {fonts.map((font) => (
                  <td key={font.name} style={{ border: '1px solid #ccc', padding: '4px', textAlign: 'center' }}>
                    <span className={`${font.classPrefix}${size}`}>{char}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}

      
    </>
  );
};

export const LineHeight = () => {
    return (
        <>
            <div className="vads-u-margin--4">
                {['sans', 'mono', 'serif'].map((font, idx) => (
                    <div key={idx} className="vads-u-margin-y--2">
                        <h4>{font}</h4>
                        {['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
                            <div>
                                <h5>{`vads-u-font--${font}-${size}`}</h5>
                                <p className={`vads-u-font--${font}-${size}`}>We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )

}