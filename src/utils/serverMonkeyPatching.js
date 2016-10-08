import React from 'react';
import { Resolver } from 'react-resolver';
import { renderToStaticMarkup } from 'react-dom/server';
import { StyleSheetServer } from 'aphrodite';

Resolver.resolve = (render, initialData = {}) => {
  const queue = [];

  StyleSheetServer.renderStatic(
    () => renderToStaticMarkup(
      <Resolver
        data={initialData}
        onResolve={((promise) => {
          queue.push(promise);
          return Promise.resolve(true);
        })}
      >
        {render}
      </Resolver>
    )
  );

  return Promise.all(queue).then((results) => {
    const data = { ...initialData };

    results.forEach(({ id, resolved }) => (data[id] = resolved));

    if (Object.keys(initialData).length < Object.keys(data).length) {
      return Resolver.resolve(render, data);
    }

    const Resolved = () => <Resolver data={data}>
      {render}
    </Resolver>;

    return { data, Resolved };
  });
};
